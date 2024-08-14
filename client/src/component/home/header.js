import React from 'react';
import '../../App.css'
import video from '../../assets/homepagehero.mp4';
const Header = () => {
    return (  
      <div className="video-container relative">
      <video className="background-video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="content flex justify-center items-center relative">
        {/* Your content here */}
        <h1 className="text-white">Discover Your Dream Home</h1>
      </div>
    </div>
    );
}
 
export default Header;