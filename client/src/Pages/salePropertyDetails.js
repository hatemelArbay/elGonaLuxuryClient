import React, { useEffect, useState ,useContext} from 'react';
import AuthContext from '../store/authContext';
import 'flowbite/dist/flowbite.min.css';
import { useLocation,useNavigate } from 'react-router-dom';
import {message} from 'antd'

import emailjs from '@emailjs/browser';

import Carousel from '../component/carousel/carousel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBed,faShower,faEye,faLocationDot, faRuler} from '@fortawesome/free-solid-svg-icons';

const SalePropertyDetailsPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [property, setProperty] = useState({});

    
    // const [errMsg,setErrorMsg] = useState('');
    // const [sucessMsg,setSuccessMsg] = useState('');

    const timeOptions = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
        "06:00 PM", "07:00 PM", "08:00 PM"
    ];

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const propertyId = queryParams.get('propertyId');

    useEffect(()=>{
    
        const fetchPropertyData=async ()=>{
            try{
                //  propertyId = queryParams.get('propertyId');
                console.log("id "+propertyId);
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/property/getPropertyUsingId?propertyId=${propertyId}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); 
                
                setProperty(data.property);
                console.log("poropety : "+JSON.stringify(data.property));

            }catch(err){
                console.log("error in fetching property data : "+err);
            }
        }
        fetchPropertyData();
    },[]);

    const bookApp = async(e)=>{
        e.preventDefault();
            console.log("cliked");
            const date=new Date(e.target.date.value);
            const time = e.target.time.value

            if (e.target.date.value==="" || e.target.time.value==="" ){
          
                message.error("please a visit date");
            }
            else if(Date.now()>date)  {
               
                console.log('please provide a valid date');
                message.error('please provide a valid date');
            }
            else{
                let status; 
                let bookedBy;
              
                if (!sessionStorage.getItem('token')) {
                    localStorage.setItem('redirectAfterLogin', window.location.pathname+window.location.search);
                    navigate('/logIn');
                    return;
                }else if (sessionStorage.getItem('role') === 'admin'){
                    status="accepted";
                 
                }else{
                    status="pending";
                }
                
                
                
                const userId=sessionStorage.getItem('userId');
                const appData={
                    userId:userId,
                    startDate:date.toISOString(),
                    propertyId:property._id,
                    status:status ,
                    bookedBy:sessionStorage.getItem('role'),
                    time:time
                }
                try{
                    console.log(appData);
                    const baseUrl = process.env.REACT_APP_BASE_URL;
                    const response = await fetch(`${baseUrl}/appointment/bookSaleApp`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(appData)
                    });
                    if(!response.ok){
                        console.log("error in response");
                    }
                    const resposeData= await response.json();
                    console.log(JSON.stringify(resposeData));
                    if(resposeData.mesg==="Appointment Booked successfully"){
                        message.success("Appointment Booked successfully");
                        
                        setTimeout(()=>{
                            if(sessionStorage.getItem('role')==='user'){
                            sendEmail();
                            }
                            navigate("/");
                        },2000);
                    }
                    else if (resposeData.app==="Appointment already reserved, please choose another date")
                        message.error("Appointment already reserved, please choose another date");
                }catch(err){
                    console.log("error in adding appointment : "+err)
                }
    
            }
            const sendEmail = async()=>{
                try{
                    const baseUrl = process.env.REACT_APP_BASE_URL;
                    const response = await fetch(`${baseUrl}/getUserData?userId=${sessionStorage.getItem('userId')}`);
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json(); 
                    const email = data.userData.email;
                    const name = data.userData.name;
                    const subject = " Appointment Confirmation from elGonaLuxury";
                    const message =`

Thank you for scheduling an appointment with elGonaLuxury.

We are currently processing your appointment request and will send you a confirmation email shortly. If we require any additional information or if there are any updates regarding your appointment, we will keep you informed.

If you have any questions or need further assistance, please feel free to contact us at 01023100148 or visit our website at www.elGonaLuxury.com.`;
                    console.log("email: " + email);
                    console.log("name: " + name);
                    emailjs
                    .send(
                      'service_9ymekll', // paste your ServiceID here (you'll get one when your service is created).
                      'template_v39w1xb', // paste your TemplateID here (you'll find it under email templates).
                      {
                        to_name: name,// put your name here.
                        to_email: email,
                        subject:subject,
                        message:message
                      
                  
                      },
                      '7CHJ5K3dA2WKCthuj' //paste your Public Key here. You'll get it in your profile section.
                    )
                }catch(err){

                }
               
                
            
            }
    
    
        }
        return (
            <>
              <section className="py-5 pageDetailsCustumMargin">
                <div className="container px-4 px-lg-5 my-5">
                  <div className="row gx-4 gx-lg-5 align-items-start">
                    <div className="col-md-6">
                      <Carousel imgUrls={property.imagesUrl} />
                    </div>
                    <div className="col-md-6">
                      <h1 className="display-5 fw-bolder mb-3 text-center">{property.propertyName}</h1>
                      <div className="flex flex-wrap justify-center">
                        <span className="badge bg-primary p-2 m-2 text-center">
                          <FontAwesomeIcon className='mr-2' size='lg' icon={faBed} color="orange" /> {property.numBeds}
                        </span>
                        <span className="badge bg-primary p-2 m-2 text-center">
                          <FontAwesomeIcon className='mr-2' size='lg' icon={faShower} color="orange" /> {property.numShower}
                        </span>
                        <span className="badge bg-primary p-2 m-2 text-center">
                          <FontAwesomeIcon className='mr-2' size='lg' icon={faLocationDot} color="orange" /> {property.compound}
                        </span>
                        <span className="badge bg-primary p-2 m-2 text-center">
                          <FontAwesomeIcon className='mr-2' size='lg' icon={faEye} color="orange" /> {property.view}
                        </span>
                        <span className="badge bg-primary p-2 m-2 text-center">
                          <FontAwesomeIcon className='mr-2' size='lg' icon={faRuler} color="orange" /> {property.measure} sqft
                        </span>
                      </div>
                      <p className="lead mt-3">{property.description}</p>
                      <form onSubmit={bookApp}>
                        <div className="flex flex-col space-y-4 mt-3">
                          <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="flex flex-col w-full">
                              <label htmlFor="date" className="text-gray-700 mb-2">Date:</label>
                              <input
                                id="date"
                                type="date"
                                className="p-2 border rounded-md w-full"
                                placeholder="Select a date"
                              />
                            </div>
                            <div className="flex flex-col w-full md:mt-0">
                              <label htmlFor="time" className="text-gray-700 mb-2">Time:</label>
                              <select
                                id="time"
                                className="p-2 border rounded-md w-full"
                                defaultValue=""
                              >
                                <option value="" disabled>Choose a time</option>
                                {timeOptions.map((time, index) => (
                                  <option key={index} value={time}>{time}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <button className="px-6 py-2 text-white bg-black rounded-md hover:bg-blue-600 w-full md:w-auto">
                            Reserve Appointment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
          

}
 
export default SalePropertyDetailsPage;