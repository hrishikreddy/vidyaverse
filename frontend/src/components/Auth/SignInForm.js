import React, { useState,useEffect } from 'react';
// import "../../assets/CSS/Signin.css";
import { GoogleOAuthProvider, GoogleLogin ,useGoogleLogin} from "@react-oauth/google";
import {GoogleButton} from "react-google-button"
import { jwtDecode } from "jwt-decode";
import Loader from '../Loader/Loader';
import axios from "axios"
import OtpForm from './OtpForm';
const SignInForm = ({loginDetails,setLoginDetails,setIslogin,navigate}) => {
    const [loader,setLoader]=useState(false)
   const [otpForm,setOtpForm]=useState(false)
    // State variables for email and password fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Event handler for changes in the email input field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Event handler for changes in the password input field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Event handler for form submission
    useEffect(()=>{
        console.log("useeffect login details executed")
        console.log(loginDetails)
        
        if(loginDetails.verified===true){
            
        }else if(loginDetails.verified===false){
            
            //we have to call the send otp function
            const sendOtp = async () => {
                try {
                    setLoader(true)
                    const response2 = await axios.post("http://localhost:3001/api/send-otp", loginDetails);
                    if (response2.data.acknowledged===true){
                    console.log("OTP sent");
                    setOtpForm(true)//displays the form to enter otp
                    setLoader(false)}else{
                        alert("an error occurred at our server \n",response2.data.des)
                    }
                    
                } catch (error) {
                    console.error("Error sending OTP:", error);
                }
            };

            sendOtp();  
            
        }
    },[loginDetails])
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response=await axios.post("http://localhost:3001/api/auth/signin",{email:email,password:password,authType:"general"}) // fetching the details from the server
        if (response.data.acknowledged===true){
            setLoginDetails(prevState=>({...prevState,...response.data.loginDetails}))
            setIslogin(true)
            sessionStorage.setItem('islogin',JSON.stringify(JSON.stringify(true)))
            sessionStorage.setItem('loginDetails',JSON.stringify(loginDetails))
            navigate("/home")
        }
        console.log(response.data)
        alert(`Your details were:\nEmail: ${email}\nPassword: ${password}`);


        // Add your form submission logic here
    };

    // Google sign-in handler
    
    const googleSignInHandler = (accessToken) => {
        console.log("google sign in executed")
        // const data = jwtDecode(credentialResponse.access_token);
        // setEmail(data.email);
        // alert("Google sign-in success");
        axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(async(response) => {
      console.log(response.data);
      const response2=await axios.post("http://localhost:3001/api/auth/google",response.data)
      console.log(response2.data)
      if (response2.data.acknowledged===true){
        console.log(response2.data.loginDetails)
        setIslogin(true)
        setLoginDetails(response2.data.loginDetails)
        navigate("/home")//navigation to hame after successfull sign up
      }
    })
    .catch(error => {
      alert(error);
    });
    };
    const glogin = useGoogleLogin({
        onSuccess: tokenResponse => {console.log(tokenResponse);googleSignInHandler(tokenResponse.access_token)},
      });
    if(otpForm){
        return (<OtpForm loginDetails={loginDetails} setLoginDetails={setLoginDetails}/>)
    }else{
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="container max-w-md p-6 bg-white rounded-lg shadow-lg">
                {loader && <Loader />}
                <h2 className="text-center text-black font-serif text-xl mb-6">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono" htmlFor="email">Email:</label>
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
                    <label className="block font-mono" htmlFor="password">Password:</label>
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
                  <a href="svnm.com" className="block text-sm text-gray-600 hover:text-blue-500">Forgot Password?</a>
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">Sign In</button>
                </form>
                <div className="mt-4">
                  <GoogleButton
                    label="Sign in with Google"
                    onClick={glogin}
                    style={{width:"100%"}}
                  />
                </div>
              </div>
            </div>
          );}
};

export default SignInForm;
