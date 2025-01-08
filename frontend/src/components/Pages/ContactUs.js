// ContactUs.js

import React, { useState } from 'react';
import '../../assets/CSS/ContactUs.css'; // Importing CSS file
import axios from 'axios'
const ContactUs = () => {
  const [formdata,setFormdata]=useState({"name":"",email:"",message:""})
  const contactformHandler=async(e)=>{
    e.preventDefault();
    const response=await axios.post("http://localhost:3001/api/contactformcontroller",formdata)
    if(response.data.acknowledged){
      alert("message successfully sent\n shortly you will receive confirmation mail from us")
    }
    else{
      alert("error occured try aagain")
    }
    e.target.reset()



  }
  const changeHandler=(e)=>{
    const {name,value}=e.target;
    setFormdata({...formdata,[name]:value})
  }
  return (
    <div className="contact-us-container">
      <div className="contact-us-content">
        <h1 className="contact-us-heading">Contact Us</h1>
        <div className="contact-info">
          <p><strong>Email:</strong> contact@vidyaverse.com</p>
          <p><strong>Phone:</strong>123567890</p>
          <p><strong>Address:</strong> CBIT,HYDERABAD</p>
        </div>
        <form className="contact-form" onSubmit={contactformHandler}>
          <input type="text" name='name' placeholder="Your Name" onChange={changeHandler} required/>
          <input type="email" name='email' placeholder="Your Email" onChange={changeHandler} required/>
          <textarea placeholder="Your Message" name='message' onChange={changeHandler} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
