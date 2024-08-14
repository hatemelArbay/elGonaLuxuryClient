import React, { useEffect, useState ,useContext} from 'react';
import '../App.css'
import AuthContext from '../store/authContext';
import 'flowbite/dist/flowbite.min.css';
import { useLocation,useNavigate } from 'react-router-dom';
import {message} from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import emailjs from '@emailjs/browser';
import Carousel from '../component/carousel/carousel2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBed,faShower,faEye,faLocationDot, faRuler} from '@fortawesome/free-solid-svg-icons';

import RentModal from '../component/appointment/rentModal';

const PropertyDetailsPage = (props) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [property, setProperty] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const propertyId = queryParams.get('propertyId');

    const [startDate,setStartDate]=useState();
    const [endDate,setEndDate]=useState();
    const [propertyPrice,setPropertyPrice]=useState();
    const [totalPrice,setTotalPrice]=useState();
    const [isModalOpen, setModalOpen] = useState(false);
    const [startDates, setStartDates]=useState([]);
    const [endDates, setEndDates]=useState([]);
    

    const openModal = () => {

        setModalOpen(true);
    }
    const closeModal = () => setModalOpen(false);
    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        if (!startDate|| !endDate){
            
            console.log("please select start and end date");
        message.error("please select start and end date");
        }
        else if(startDate>=endDate || Date.now()>startDate)  {
         
            console.log('please provide a valid date');
            message.error('please provide a valid date');
        }else{
            const start = new Date(startDate);
  const end = new Date(endDate);

  const oneDay = 24 * 60 * 60 * 1000; 
  const numberOfNights = Math.round((end - start) / oneDay);

  setTotalPrice((numberOfNights+1) * propertyPrice);
        openModal(); // Open the modal for confirmation
        }
    };
    const bookApp = async()=>{
 
        console.log("cliked");
        
        
        
            let status; 
            let bookedBy;
           
            if (!sessionStorage.getItem('token')) {
                localStorage.setItem('redirectAfterLogin', window.location.pathname+window.location.search);
                navigate('/logIn');
                return;
            }else if (sessionStorage.getItem('role')=== 'admin'){
                status="accepted";
             
            }else{
                status="pending";
            }
            
            
            
            const userId=sessionStorage.getItem('userId');
            console.log({startDate:startDate.toISOString(),endDate:endDate.toISOString()});
            const appData={
                userId:userId,
                startDate:startDate.toISOString(),
                endDate:endDate,
                propertyId:property._id,
                status:status ,
                bookedBy:sessionStorage.getItem('role'),
            }
            console.log("app date : "+appData);
         
     
 
            try{
                
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/appointment/bookApp`, {
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
                if(resposeData.app.mesg==="appointment booked successfully"){
                    message.success("Appointment Booked successfully");
                    setTimeout(()=>{
                        sendEmail();
                        navigate("/");
                    },2000);
                }
                else if (resposeData.app.mesg==="This property is already booked for the selected dates")
                    message.error("This property is already booked for the selected dates");
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
        
            console.log("email: " + email);
            console.log("name: " + name);
            emailjs
            .send(
              'service_9ymekll', // paste your ServiceID here (you'll get one when your service is created).
              'template_47yr1q6', // paste your TemplateID here (you'll find it under email templates).
              {
                toName: name,// put your name here.
                to_email: email,
                propertyName:property.propertyName,
                Location:property.location,
                startDate:startDate,
                endDate:endDate,
                pricePerNight:propertyPrice,
                totalPrice:totalPrice
              
          
              },
              '7CHJ5K3dA2WKCthuj' //paste your Public Key here. You'll get it in your profile section.
            )
        }catch(err){

        }
       
        
    
    }
    
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
        const fetchDisableDates= async ()=>{
            try{
                console.log("id "+propertyId);
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/appointment/getDisableDates?propertyId=${propertyId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                console.log(responseData);
                setStartDates(responseData.disabledDates.starteDates);               
                setEndDates(responseData.disabledDates.endeDates);
            }catch(err){
            console.log("error in fetching disable dates : "+err );
            }
        }
        
        const fetchPropertyPrice = async()=>{
            try{
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/property/getPropPrice?propertyId=${propertyId}`);
                const responseData = await response.json();
                console.log("property price : "+JSON.stringify(responseData));
                if(response){
                    setPropertyPrice(responseData.propertyPrice);
                }
            }catch(err){
                console.log("error in fetching property price "+err );
            }
        }
        fetchPropertyData();
        fetchPropertyPrice();
        fetchDisableDates();
    },[]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Default format, e.g., MM/DD/YYYY
      };


     const isDateDisabled = (date) => {

  const inputDate = new Date(date);


  for (let i = 0; i < startDates.length; i++) {
  
    const startDate = new Date(startDates[i]);
    const endDate = new Date(endDates[i]);

   
    const startDateMinusOneDay = new Date(startDate);
    startDateMinusOneDay.setDate(startDateMinusOneDay.getDate() - 1);

    const endDatePlusOneDay = new Date(endDate);
    endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);

   
    if (inputDate >= startDateMinusOneDay && inputDate <= endDatePlusOneDay) {
      return true;
    }
  }
  
  return false;
};
const dayClassName = date => {
    return isDateDisabled(date) ? 'react-datepicker__day--disabled' : undefined;
  };
      

      

  return (
  <>
    <section className="py-5 pageDetailsCustumMargin">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <Carousel imgUrls={property.imagesUrl} />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder mb-3 text-center">{property.propertyName}</h1>
            <div className="flex flex-wrap justify-center">
              <span className="badge bg-primary p-2 m-2">
                <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faBed} color="orange" /> {property.numBeds}
              </span>
              <span className="badge bg-primary p-2 m-2">
                <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faShower} color="orange" /> {property.numShower}
              </span>
              <span className="badge bg-primary p-2 m-2">
                <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faLocationDot} color="orange" /> {property.compound}
              </span>
              <span className="badge bg-primary p-2 m-2">
                <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faEye} color="orange" /> {property.view}
              </span>
              <span className="badge bg-primary p-2 m-2">
                <FontAwesomeIcon className='text-center mr-2' size='lg' icon={faRuler} color="orange" /> {property.measure} sqft
              </span>
            </div>
            <p className="lead mt-3">
              {property.description}
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-4 mt-3">
                <div className="flex flex-wrap justify-between">
                  <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="dateFrom" className="text-sm font-medium mb-2">From</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      filterDate={(date) => !isDateDisabled(date)}
                      className="p-2 border rounded-md w-full"
                      placeholderText="Arrival date"
                    />
                  </div>

                  <div className="flex flex-col w-full md:w-1/2">
                    <label htmlFor="dateTo" className="text-sm font-medium mb-2">To</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      filterDate={(date) => !isDateDisabled(date)}
                      className="p-2 border rounded-md w-full"
                      placeholderText="Leaving Date"
                    />
                  </div>
                </div>

                <button className="px-6 mt-3 py-2 text-white bg-black rounded-md hover:bg-blue-600 w-full md:w-auto">
                  Reserve Appointment
                </button>

                <RentModal 
                  isOpen={isModalOpen} 
                  onClose={closeModal} 
                  onConfirm={bookApp} 
                  bookingDetails={{
                    startDate: formatDate(startDate),
                    endDate: formatDate(endDate),
                    pricePerNight: propertyPrice,
                    totalPrice: totalPrice
                  }} 
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
);

}

export default PropertyDetailsPage;
