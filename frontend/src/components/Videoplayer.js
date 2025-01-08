import React from 'react'
import '../assets/CSS/Videoplayer.css'
const Videoplayer = ({videolink,title,description}) => {
  return (
    <div className='videoplayercontainer w-screen '>
        <div className='videotitle text-center'>
            {title}
        </div>
        <div className='videoplayer '>
        {/* <video controls width="600">
        <source src="https://drive.google.com/file/d/15s7sM4yIUuuZRXI0ighNJkFkuEuBEZZ7/view?t=15" type="video/mp4" />
                Your browser does not support the video tag.
        </video> */}
        <iframe 
    src={videolink}
    width="640" 
    height="400" 
    allow="autoplay; fullscreen">
</iframe>

       

        </div>
        <div className='videoplayerdescription'>
            <h1>Description</h1>
            {description}
        </div>
    </div>
  )
}

export default Videoplayer