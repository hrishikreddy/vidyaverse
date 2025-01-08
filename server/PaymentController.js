const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const {MongoClient}=require("mongodb")
require("dotenv").config();
const axios=require("axios")
const uri=require("./uri")
const cluster2=new MongoClient(uri)
cluster2.connect()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/api/order", async (req, res) => {
    let options=""
  try {
     options = req.body;
     console.log(options)
    const order = await razorpay.orders.create(options);
    const transactions=cluster2.db("edulink").collection("transactions")
    const respo1=await transactions.insertOne({razorpay_order_id:order.id,status:false})
    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    console.log(options)
    
    res.status(500).send("Error");
  }
});

router.post("/api/order/validate", async (req, res) => {
  const data=req.body
  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    const transactions=cluster2.db("edulink").collection("transactions")
    const respo1= await transactions.updateOne({razorpay_order_id:razorpay_order_id},{$set:{razorpay_payment_id:razorpay_payment_id,status:false}})
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  const transactions=cluster2.db("edulink").collection("transactions")
  const respo1= await transactions.updateOne({razorpay_order_id:razorpay_order_id},{$set:{razorpay_payment_id:razorpay_payment_id,status:true}})
  try{await axios.post(process.env.baseurl+"/api/paymentenroll",data)
console.log(process.env.baseurl)}catch(err){
    
    console.log(err)
    console.log(process.env.baseurl)

  }
  
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

module.exports = router;
