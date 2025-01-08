import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route,useNavigate,useHistory } from "react-router-dom";
import './App.css';
import SignInForm from "./components/Auth/SignInForm";
import Home from "./components/Pages/Home";
import SignUpForm from "./components/Auth/SignUpForm";
import OtpForm from "./components/Auth/OtpForm";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar.js";
import CoursePayment from "./components/payment/CoursePayment.js";
import ContactUs from "./components/Pages/ContactUs.js";
import AboutUs from "./components/Pages/AboutUs.js";
import CourseList from "./components/CourseList.js";
import Coursecontent from './components/Pages/Coursecontent.js'
import Navbar1 from "./components/Navbar1.tsx";
import AiHelp from "./components/AiHelp.tsx";
import Profile from "./components/Pages/Profile.jsx";
import Product from "./components/Pages/Product.js"
function App() {
  
  const navigate=useNavigate()
  const [loginDetails,setLoginDetails]=useState(JSON.parse(sessionStorage.getItem("loginDetails"))||{})
  const [islogin,setIslogin]=useState(JSON.parse(sessionStorage.getItem("islogin"))||false)
  useEffect(()=>{
    console.log(islogin,islogin===false)
      if (islogin===false){
        console.log("navigate executed")
        navigate("/signin")

      }else if(islogin===true) {
        sessionStorage.setItem("islogin",JSON.stringify(true))
      }
  },[islogin])

  useEffect(()=>{
    if (loginDetails){
    sessionStorage.setItem("loginDetails",JSON.stringify(loginDetails))
    console.log("loginDetails",loginDetails)}
  },[loginDetails])
  return (<>
      
      <Navbar1  islogin={islogin} setIslogin={setIslogin} /> {/* Render Navbar component outside of Routes */}
      <Routes>
        {/* <Route path="/navbar1" element={<Navbar1 islogin={islogin} />} /> */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/signin" element={<SignInForm loginDetails={loginDetails} setLoginDetails={setLoginDetails} setIslogin={setIslogin} navigate={navigate}/>} />
        <Route path="/signup" element={<SignUpForm loginDetails={loginDetails} setLoginDetails={setLoginDetails} setIslogin={setIslogin} navigate={navigate}/>} />
        <Route path="/otp" element={<OtpForm navigate={navigate}/>} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/paymentform" element={<CoursePayment />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/courselist" element={<CourseList loginDetails={loginDetails} setLoginDetails={setLoginDetails}/>}/>
        <Route path="/course" element={<Coursecontent loginDetails={loginDetails} setLoginDetails={setLoginDetails}/>}/>
        <Route path="/aihelp" element={<AiHelp/>}/>
        <Route path="/profile" element={<Profile userData={loginDetails}  />}/>
        <Route path="/payment" element={<Product/>}/>

      </Routes>
      </>
  );
}

export default App;
