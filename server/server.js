const express=require("express")
const app=express("express")
const cors=require("cors")
const {MongoClient,ObjectId}=require("mongodb")
const uri=require("./uri.js")
const nodemailer=require("nodemailer")
const htmlOtpTemplate =require("./mailTemplates/htmlOtpTemplate.js")
const math=require("math")
const stripe=require("stripe")("sk_test_51P3VWJSDr8IP7RmM08yxHbMzysDtENtB1prn3bL5PwAsF3JDBX4asDbVz7JVD8KZDqSyQ3FgjT30ZhitLKu37Hvl00xZARPcrk")
const contactformcontroller=require("./contactformcontroller.js")
const AccountHolder=require("./dbschemas/AccountHolder.js")
const chatbotcontroller=require("./chatbotcontroller.js")
const PaymentController=require("./PaymentController.js")
app.use(cors())
app.use(express.json())
app.use(chatbotcontroller)
app.use(PaymentController)
const cluster=new MongoClient(uri)
cluster.connect().then(()=>{console.log("database successfully conncted")}).catch(err=>{console.log(err)})
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'edulink.mailservices@gmail.com',
      pass: 'vxjt apns lrgz rvgp'//'hcob coir phyo alpo'
    }
  });
  let mailOptions = (receiver,subject,htmlTemplate)=>{return{
    from: "edulink.mailservices@gmail.com", // sender address
    to: receiver, 
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: htmlTemplate // html body
  }};
app.post("/api/auth/signin", async(req,res)=>{
    try{
    const data=req.body
    
    console.log(req.body)
     if(data.authType=="general"){
        const accounts=await cluster.db("edulink").collection("accounts")
        const recv_data=await accounts.findOne({email:data.email,password:data.password})
        if (recv_data==null){
            res.status(200).send({acknowledged:false,des:"account not found"})
        }else{
            res.status(200).send({acknowledged:true,loginDetails:recv_data})
        }
    }
    }catch(err){
        console.log(err);
        res.status(404).send({acknowledged:false,des:"error occurred at our server"});
    }


    })

app.post("/api/auth/signup",async(req,res)=>{
    try{
        const data =req.body
         if(data.authType=="general"){
            const accounts =await cluster.db("edulink").collection("accounts")
            const recv_data=await accounts.findOne({email:data.email})
            if (recv_data==null){
                const temp=AccountHolder(data)// creating accountholer model
                const create_account=await accounts.insertOne(temp)
                const create_account_respo=await accounts.findOne({email:data.email})
                console.log(create_account)
                console.log(create_account_respo)

                res.status(200).send({acknowledged:create_account.acknowledged,des:"account successfully created",logindetails:{...create_account_respo}})
        }else{
            res.status(200).send({acknowledged:false,des:"account aldready exists please sign in to continue"})
        }
        }

    }catch(err){
        console.log(err)
        res.status(404).send({acknowledged:false,des:"error occurred at our server"})
    }
})
app.post("/api/auth/google",async(req,res)=>{
    try{
        console.log("google authentication called")
    const data=req.body
    const accounts =await cluster.db("edulink").collection("accounts")
        const recv_data=await accounts.findOne({email:data.email})
        if (recv_data==null){
            const temp=AccountHolder({email:data.email,authType:"google",verified:true,name:data.name,profile_picture:data.picture})
            const create_account=await accounts.insertOne(temp)
            const account_data=await accounts.findOne({email:data.email})
            
            res.status(200).send({acknowledged:create_account.acknowledged,des:"account successfully created",loginDetails:account_data})
        }else{
            
            res.status(200).send({acknowledged:true,des:"account fetched successfully",loginDetails:recv_data})
        }
    }catch(err){
        console.log(err)
        res.status(404).send({acknowledged:false,des:"error occured at our server"})
    }

});

app.post("/api/send-otp",async(req,res)=>{
    try{
        console.log("sendotp called")
    const data=req.body
    const min = 1000;
    const max = 9999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    const otpdb=await cluster.db("edulink").collection("otp")
    
    const otp_res=await otpdb.findOneAndUpdate({_id:data.email},{$set:{otp:otp}},{upsert:true})
    console.log(data)
    console.log(otp_res) 
    console.log(data.email)
    if(true){
        transporter.sendMail(mailOptions(data.email,"mail verification",htmlOtpTemplate(otp)),(err,info)=>{
            if(err){
                console.log(err)
                res.send({acknowledged:false,des:"error occurred at our server"})
            }
            res.send({acknowledged:true,des:"otp sent"})
        })
         
    }
    }catch(err){
        console.log(err)
        res.send({acknowledged:false,des:"error occured at our server"})
    }

})

app.post("/api/verify-otp",async(req,res)=>{
    try{
        console.log("verifyotp called")
        const data=req.body
        const otpdb=await cluster.db("edulink").collection("otp")
        const res_otp=await otpdb.findOne({_id:data.email})
        console.log(data)
        if(res_otp!==null && res_otp.otp==data.otp){
            const accounts=await cluster.db("edulink").collection("accounts")
            const user_info=await accounts.findOneAndUpdate({email:data.email},{$set:{verified:true}})
            res.send({acknowledged:true,des:"account created and verified"})

        }else{
            console.log(res_otp)
            res.send({acknowledged:false,des:"otp verification failed"})
        }
    }catch(err){
        console.log(err)
        res.send({acknowledged:false,des:"error occured at our server"})
    }
})

//api to get the profile details 
app.post("/api/profile" ,async(req,res)=>{
    try{
    data=req.body
    accounts=await cluster.db("edulink").collection("accounts")

    const respo=await accounts.find({email:data.email}).project({email:1,name:1,badges:1,_id:0,certificates:1,badges:1}).toArray()
    console.log(respo)
    res.send(respo[0])
    }catch(err){
        console.log(err)
    }
})
//creating the api to get the courses available in the website
app.post("/api/getcoursesinfo",async(req,res)=>{
    try{
        const courses=await cluster.db("edulink").collection("courses")
        const respo=await courses.find({}).project({studentsEnrolled:0}).toArray()
        res.send(respo)
    }catch(err){
        console.log(err)
    }
})
app.post("/api/getcoursecontent",async(req,res)=>{
    try{
        console.log('getcoursecontent called')
        const data =req.body
        const courses=await cluster.db("edulink").collection("courses")
        const accounts=await cluster.db("edulink").collection("accounts")
        const respo1=await accounts.findOne({email:data.email})
        if (data.courseid in respo1.enrolled_courses){
            const respo2=await courses.findOne({_id:new ObjectId(data.courseid)})
            res.send({acknowledged:true,content:respo2.content})
        }else{
            res.send({acknowledged:false})
        }
    }catch(err){
        console.log(err)
    }
})

//courses returning function
app.get("/api/getcourses",async(req,res)=>{
    try{
        const courses=await cluster.db('edulink').collection("courses")
        const response=await courses.find({}).project({enrolled_courses:0,content:0,materials_resources:0}).toArray()
        res.send({acknowledged:true,courses:response})
    }catch(error){
        console.log(error)
    }
})

//free course enrollment function
app.post("/api/freeenroll",async(req,res)=>{
    try{
    const data =req.body
    const database=cluster.db("edulink")
    const accounts =await database.collection('accounts')
    const courses=await database.collection("courses")
    const respo1=await accounts.findOne({email:data.email})
    const respo2=await courses.findOne({_id: new ObjectId(data.courseid)})
    if (respo1 !==null && respo2!==null && !Object.keys(respo1.enrolled_courses).includes(data.courseid)){
        const respo3 =await accounts.updateOne({email:data.email},{$set:{enrolled_courses:{...respo1.enrolled_courses,[data.courseid]:{title:data.title}}}})
        res.send({acknowledged:true,enrolled_courses:{...respo1.enrolled_courses,[data.courseid]:{title:respo2.title}}})
    }else{
        res.send({acknowledged:false,description:"aldready enrolled "})
    }
    }catch(error){
        console.log(error)
        res.send({acknowledged:false,description:"error occured"})
    }
})

app.post("/api/paymentenroll",async(req,res)=>{
    try{
    const data =req.body
    
    const database=cluster.db("edulink")
    const accounts =await database.collection('accounts')
    const courses=await database.collection("courses")
    const respo1=await accounts.findOne({email:data.email})
    const respo2=await courses.findOne({_id: new ObjectId(data.courseid)})
    console.log(respo2)
    if (respo1 !==null && respo2!==null && !Object.keys(respo1.enrolled_courses).includes(data.courseid)){
        const respo3 =await accounts.updateOne({email:data.email},{$set:{enrolled_courses:{...respo1.enrolled_courses,[data.courseid]:{title:data.coursetitle}}}})
        res.send({acknowledged:true,enrolled_courses:{...respo1.enrolled_courses,[data.courseid]:{title:respo2.title}}})
    }else{
        res.send({acknowledged:false,description:"aldready enrolled "})
    }
    }catch(error){
        console.log(error)
        res.send({acknowledged:false,description:"error occured"})
    }
})

app.post("/api/markassolved",async(req,res)=>{
    const data=req.body
    const accounts=cluster.db("edulink").collection("accounts")
    const respo1=await accounts.findOne({email:data.email})
    const courses=cluster.db("edulink").collection("courses")
    const respo=await courses.findOne({_id:new ObjectId(data.courseid)})
    console.log(respo1,respo)
    if (respo1!==null){
        const respo2 = await accounts.updateOne(
            {"email": data.email},
            { 
                $set: { 
                    [`enrolled_courses.${data.courseid}.${data.unit}`]: true 
                } 
            }
        
        );
        console.log(Object.keys(respo1.enrolled_courses[data.courseid]).length,Object.keys(respo.content).length)
        console.log(Object.keys(respo1.enrolled_courses[data.courseid]))
        console.log(Object.keys(respo.content))
        if(Object.keys(respo1.enrolled_courses[data.courseid]).length===Object.keys(respo.content).length){
            const respo3=await accounts.findOneAndUpdate({email:data.email},{$set:{[`completed_courses.${data.courseid}.title`]:data.title}})
        }
        
        const respo3=await accounts.findOne({email:data.email})
        if (respo2.acknowledged){
            res.send({acknowledged:true,loginDetails:{...respo3}})
        }
    }else{
        res.send({acknowledged:false})
    }
})
//payment handling stripe gateway

app.post("/api/paymentprocesser",async(req,res)=>{
    const data=req.body
    // const lineitems = [{
    //     price_data: {
    //         currency: 'INR',
    //         product_data: {
    //             name: 'python'
    //         }
    //     },
    //     quantity: 1
    // }];
    const lineItems = [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: 'Python Course', // Specify the name of your product
                images: ['https://example.com/python-course.jpg'], // Optional: Include images of your product
            },
            unit_amount: 1000, // Specify the amount in cents (e.g., $10.00)
        },
        quantity: 1, // Specify the quantity of the product
    }];
    
    
   const session=await stripe.checkout.sessions.create({
    payment_method_types:["paypal"],
    line_items:lineItems,
    mode:"payment",
    success_url:"https://localhost:3000/home",
    cancel_url:"https://localhost:3000/otp"
   })
   res.send({id:session.id})

})
app.post("/api/getenrolledcourses",async(req,res)=>{
    try{
    const data=req.body
    const accounts=cluster.db("edulink").collection("accounts")
    const respo1=await accounts.findOne({email:data.email})
    res.send({acknowledged:true,loginDetails:respo1})
    }catch(err){
        console.log(err)
    }
})
app.post("/api/contactformcontroller",async(req,res)=>{
    try{
    const data =req.body;
    const contactusforms=await cluster.db("edulink").collection("contactusforms")
    const response=await contactusforms.insertOne(data);
    if (response.acknowledged){
        res.send({acknowledged:true})
    }else{
        res.send({acknowledged:false})
    }
    }catch(error){
        console.log(error)
    }
})
app.listen(3001,()=>{console.log("backend running on the port 3001")})
