import React from 'react'
import DisplayText from '../Home/DisplayText'
import ImageSlider from '../ImageSlider'
import CoursesButton from '../Home/CoursesButton'
import Testimonials from '../Home/Testimonials'
import LanguageBlocks from '../Home/LanguageBlocks'

const Home = () => {
  const slides = [
    { url: "https://th.bing.com/th/id/OIP.VQGFS8Qt7wK7Icy7bQHw-AAAAA?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", title: "python" },
    { url: "https://th.bing.com/th/id/OIP.vQpA3TUhXqnP5P7Lg4tBzAAAAA?w=285&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7", title: "java" },
    { url: "/image-3.jpeg",title:"c++"},
    { url: "http://localhost:3000/image-4.jpeg", title: "react" },
    { url: "http://localhost:3000/image-5.jpeg", title: "node" },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    "margin-top": "5px",
    "margin-bottom":"30px",
    "margin-left":"auto",
    "margin-right":"auto",
  };
  return (
    <div>
        <DisplayText/>
        <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
        <CoursesButton/>
        <LanguageBlocks/>
        <Testimonials/>
    </div>
  )
}

export default Home