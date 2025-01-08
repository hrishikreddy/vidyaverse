const mongoose=require('mongoose')
const AccountHolderSchema= new mongoose.Schema({
      email: {
        type: String,
        required: true
      },
      password: String,
      name: {
        type: String,
        required: true
      },
      profile_picture: {
        type:String,
        default:""
      }
      ,
      role:{
        type:String,
        default:"student"
      },
      enrolled_courses: {
        type: Map,
        default: {}
      },
      completed_courses: {
        type:Map,
        default:{}
      },
      password:{
        type:String,
        default:""
      },
      AuthType:{
        type:String,
        required:true
      },
      verified:{
        type:Boolean,
        default:false
      }
    });
    const AccountHolder=mongoose.model('AccountHolder',AccountHolderSchema)
module.exports=AccountHolder;