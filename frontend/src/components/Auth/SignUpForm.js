

import React, { useState,useEffect } from 'react';
// import  "../../assets/CSS/Signin.css";
import {GoogleOAuthProvider,GoogleLogin,useGoogleLogin} from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"
import axios from "axios"
import {GoogleButton} from "react-google-button"
import OtpForm from "../Auth/OtpForm.js"
import Loader from "../Loader/Loader.js"
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({setIslogin,loginDetails,setLoginDetails}) => {
  const navigate= useNavigate()
    const [loader,setLoader]=useState(false)
    const [otpForm,setOtpForm]=useState(false)
    
    const [otpVerify,setOtpVerify]=useState(true)
    // State variables for email and password fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState("")
    // Event handler for changes in the email input field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Event handler for changes in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Event handler for form submission
    const handleSubmit = async(e) => {
        try{
        e.preventDefault();
        if (password!==confirmPassword){
            alert("password and confirm password didn't match")
        }else{
        console.log("before axios")
        let response=await axios.post("http://localhost:3001/api/auth/signup",{email:email,password:password,verified:false,authType:"general"})
        console.log("after axios")
        if(response.data.acknowledged===true){
            console.log(response.data.logindetails)
            setLoginDetails(prevState=>{return {...prevState,...response.data.logindetails}})
            setOtpVerify(prevState => !prevState);
            }
            
      else{
            console.log(response.data.des)
            alert(`your details were\n email;${email}\npassword: ${password}`)}
        }
    }catch(err){
        console.log(err)
    }

        // Add your form submission logic here
    };
    const googleSignUpHandler = (accessToken) => {
        console.log("google sign in executed")
        // const data = jwtDecode(credentialResponse.access_token);
        // setEmail(data.email);
        // alert("Google sign-in success");
        axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(async response => {
      console.log(response.data);
      const signupresponse=await axios.post("http://localhost:3001/api/auth/google",response.data)
      const response2=signupresponse
      if (response2.data.acknowledged===true){
        console.log(response2.data.loginDetails)
        setIslogin(true)
        setLoginDetails(response2.data.loginDetails)
        navigate("/home")//navigation to hame after successfull sign up
      }else{
            alert("loginfailed error occurredd")
        }
    })
    .catch(error => {
      alert(error);
    });


    };
    const handleConfirmPasswordChange=(e)=>{
        setConfirmPassword(e.target.value)
    }
    const glogin = useGoogleLogin({//default code given by google official documentation
        onSuccess: tokenResponse => googleSignUpHandler(tokenResponse.access_token),
      });
    
    // useEffect({
    // },[loginDetails.verified])
   

    useEffect(() => {
        console.log("useeffect called")
        console.log(loginDetails)
        console.log((loginDetails.verified === false && otpVerify ===false))
        console.log(loginDetails,otpVerify)
        if(loginDetails.verified==true){
          navigate("/signin")
        }
        if (loginDetails.verified === false && otpVerify ===false) {
            
            const sendOtp = async () => {
                try {
                    setLoader(true)
                    const response2 = await axios.post("http://localhost:3001/api/send-otp", loginDetails);
                    console.log("OTP sent");
                    setOtpForm(true)//displays the form to enter otp
                    setLoader(false)
                    
                } catch (error) {
                    console.error("Error sending OTP:", error);
                }
            };

            sendOtp();  
            console.log("otp block exe started")
        }
    }, [loginDetails, otpVerify]);


    if(otpForm){
        return (<>
        
        <OtpForm loginDetails={loginDetails} setLoginDetails={setLoginDetails}/></>)   
    }else{
        return (
            <div className="outerbody flex items-center justify-center h-[85vh]">
              <div className="container max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                {loader && <Loader />}
                <h2 className="text-center text-black text-lg font-bold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block" htmlFor="email">Email:</label>
                    <input
                      className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block" htmlFor="password">Password:</label>
                    <input
                      className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block" htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                      className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      type="password"
                      id="confirmpassword"
                      name="confirmpassword"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">Sign Up</button>
                </form>
                <div className="mt-4">
                  <GoogleButton
                    label="Sign up with Google"
                    onClick={glogin}
                    style={{width:"100%"}}
                  />
                </div>
              </div>
            </div>
          );}
};

export default SignUpForm;
