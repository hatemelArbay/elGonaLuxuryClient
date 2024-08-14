import React,{useEffect} from 'react';
import HomeImg from '../../assets/home.png'
import WOW from "wowjs";

const AboutUs = () => {
  
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
    return () => {
      wow.sync(); 
    };
  }, []);

    return (  
        <div id="aboutUs" className='aboutus'>
          <div className='pt-5'>
        <div className="page-section pb-0">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 py-3 wow fadeInUp">
            <h1>Welcome to ElGona <br />Luxury</h1> 
            <p className="text-grey mb-4">We specialize in providing exquisite apartments for sale and rent in the stunning coastal town of El Gouna. Our mission is to offer a seamless and luxurious living experience, with properties situated in prime locations close to beautiful beaches, vibrant nightlife, and top-notch amenities. At Gona Luxury, we pride ourselves on exceptional quality, featuring modern designs and luxurious finishes in all our apartments. Our dedicated team offers personalized service to meet your specific needs, ensuring an effortless and enjoyable search for the perfect property. From the initial inquiry to the final transaction, we provide comprehensive support for a smooth and stress-free experience. Discover the ultimate in luxury living with Gona Luxury, where every detail is designed to offer unparalleled comfort and elegance.</p>
           
          </div>
          <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
            <div className="img-place custom-img-1">
            <img src={HomeImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
}
 
export default AboutUs;