import React, { useState, useRef,useEffect } from 'react';
import "../../assets/CSS/OtpForm.css"
import axios from "axios"

const baseurl="http://localhost:3001"

const OtpForm = ({loginDetails,setLoginDetails,navigate}) => {
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = useRef([])
  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length-1) // Allow only numeric input and limit to 1 character
    setOtp(newOtp);
    
    // Move focus to the next input field
    console.log((value ,index < refs.length - 1) )
    if (value && index < otp.length - 1 && refs.current[index+1]) {
      refs.current[index + 1].focus();
      console.log("shift focus executed")
    }
    console.log(refs)
  };
  
  const handleKeyDown=(index,e)=>{
      if (e.key=="Backspace" && e.target.value==="" && index>0){
        refs.current[index-1].focus()
      }
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    console.log('Submitted OTP:', enteredOtp); 
    const response=await axios.post("http://localhost:3001/api/verify-otp",{...loginDetails,otp:parseInt(enteredOtp)})
    console.log(response.data)
    if (response.data.acknowledged===true){
        console.log("otp verification success")
        setLoginDetails(prevState => ({ ...prevState, verified: true }));
        
    }else{
        alert(response.data.des)
    }
    // Add your submit logic here, e.g., sending OTP to server for verification
  };
useEffect(()=>{
  if(loginDetails.verified===true){
    alert("verification success",loginDetails)
    
    
  }
},[loginDetails])

  return (
    <div className='outer2-otp'>
    <div className="outer-container">
      <h2>Enter OTP</h2>
      <div className="otp-input">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            // maxLength={1}
            style={{ width: '40px', margin: '0 5px', textAlign: 'center' }}
            ref={(input)=>(refs.current[index]=input)}
            className="otp-digit"
            onKeyDown={(e)=>{handleKeyDown(index,e)}}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" className="submit-btn" />
      </form>
    </div>
    </div>
  );
};

export default OtpForm;
