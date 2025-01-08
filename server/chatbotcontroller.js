const express=require("express")
const router=express.Router()
const {GoogleGenerativeAI}=require("@google/generative-ai")
require("dotenv").config()

router.post("/api/chat",async(req,res)=>{
    try{
    const history =req.body.history
    const message=req.body.message
    const generationConfig=req.body.generationConfig
    console.log(process.env.API_KEY)
    const genAI=new GoogleGenerativeAI(process.env.API_KEY)
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const chat = model.startChat({
            history: history,
            generationConfig: generationConfig,
            
            
        });
            
const result = await chat.sendMessage(message);

         res.send({acknowledged:true,text:result.response.text()})
        }catch(err){
            console.log(err)
        }
})

module.exports=router
