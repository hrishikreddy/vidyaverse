import React, { useEffect, useState } from 'react';
import VideoSlider from "../VideoSlider.js";
import Videoplayer from "../Videoplayer";
import ListIcon from '@mui/icons-material/List';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import '../../assets/CSS/Coursecontent.css';
import axios from 'axios';
import {useLocation} from "react-router-dom"
import { List } from '@mui/material';

const Coursecontent = ({loginDetails,setLoginDetails}) => {
    const [videolink,setVideolink]=useState("https://drive.google.com/file/d/1JOcmzrsCtWodeIsyEJJCYPH2XuMLxQ7z/preview")
    const [slider,setSlider]=useState({})
    const [description,setDescription]=useState("click on the video menu bar to play the video")
    const [title,setTitle]=useState("course videos")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jsonDataString = queryParams.get('data');
    const courseid = JSON.parse(decodeURIComponent(jsonDataString));
    const [slidermenu,setSliderMenu]=useState(true)
    useEffect(()=>{
        const getcoursecontenthandler=async()=>{
        console.log("getcoursecontent",loginDetails)
        const response=await axios.post("http://localhost:3001/api/getcoursecontent",{courseid:courseid,email:loginDetails.email})
        if (response.data.acknowledged===true){
            setSlider(response.data.content)
        }else{
            alert("content loading failure")
        }
        
        }
        getcoursecontenthandler();
    },[]);
    useEffect(()=>{
        console.log("slider",slider)
    },[slider])
  return (<div className='outerbodycoursecontent'>
    <div className='coursecontentheader relative '>
        <p className='text-center font-bold text-2xl mb-1 ml-6 '>Python Crash course (Basic)</p>
        {!slidermenu &&
        <div className='absolute top-0 left-0  mr-1 lg:hidden' onClick={()=>setSliderMenu(prev=>!prev)}>
        <ListIcon sx={{fontSize:35}}/>
        
        </div>
        }
        {slidermenu &&
        <div className='absolute top-0 left-0  mr-1 lg:hidden' onClick={()=>setSliderMenu(prev=>!prev)}>
        <MenuOpenIcon sx={{fontSize:35}}/>
        
        </div>
        }
    </div>
    
    <div className="coursecontent relative h-[80vh] w-screen flex">
        <VideoSlider slider={slider} setVideolink={setVideolink} setDescription={setDescription} setTitle={setTitle} slidermenu={slidermenu} setSliderMenu={setSliderMenu} setLoginDetails={setLoginDetails} courseId={courseid} loginDetails={loginDetails}/>
        <Videoplayer videolink={videolink} description={description} title={title}/>
    </div>
    </div>)
}

export default Coursecontent