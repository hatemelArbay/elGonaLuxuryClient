import React,{useEffect, useState} from 'react';
import { useNavigate ,Link} from 'react-router-dom';

import Header from '../component/home/header';
import AboutUs from '../component/home/aboutUs';
import Statistic from '../component/statistics/statistics';
import ComCard from './../component/cards/comCard';
import ContactUsForm from '../component/cards/contactUs/contactUsForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey  } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faSmile  } from '@fortawesome/free-solid-svg-icons';
import {faArrowRight  } from '@fortawesome/free-solid-svg-icons';



import Product from './../component/cards/productCard';

const HomePage = () => {
    const [featuredProperties,setFeaturedProperties]=useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [activeLink, setActiveLink] = useState('allProperties');
  const [rentCount , setRentCount] = useState('');
  const [saleCount, setSaleCount] = useState('');
  const [statisfiedCustCount, setStatisfiedCustCount] = useState('');
    const navigate=useNavigate();

useEffect(() => {

  const fetchPropertiesCount=async()=>{
    try{
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${baseUrl}/property/getPropStatistics`);
      const data = await response.json();
      if (!response.ok){
          throw new Error("error in geting FeaturedProperties");
      }
      setRentCount(data.rentCount);
      setSaleCount(data.saleCount);

    }catch(err){
      console.log("error in getting properties count : "+err);
    }
  }
  const fetchStatisfiedCust=async()=>{
    try{
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${baseUrl}/appointment/getAppStatistics`);
      const data = await response.json();
      if (!response.ok){
          throw new Error("error in geting statisfied customers");
      }
     
      setStatisfiedCustCount(data.statisfiedCust);
   

    }catch(err){
      console.log("error in getting statisfied customers count : "+err);
    }
  }
const fetchPropeties= async()=>{
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const response = await fetch(`${baseUrl}/property/getFeaturedProperties`);
    const data = await response.json();
    if (!response.ok){
        throw new Error("error in geting FeaturedProperties");
    }
    setFeaturedProperties(data.featuredProperties);
    setFilteredProperties(data.featuredProperties);

};
fetchPropeties();
fetchPropertiesCount();
fetchStatisfiedCust();
},[]);

const handleFilter = (type) => {
    console.log("handlefilter");
    setActiveLink(type);
    if(type==='allProperties'){
        setFilteredProperties(featuredProperties);
    }
    else{
    setFilteredProperties(featuredProperties.filter(property => property.propertyType === type));
    }
  };

    return (  
        <>
    <Header/>
    <AboutUs/>
    <div id='services' className='homePageCardsSection'>
<ComCard
  title="Find Your Perfect Rental Home" 
  description="Discover a variety of rental homes that suit your lifestyle and budget. From cozy apartments to spacious houses, we have the perfect place for you to call home. Start your rental journey today and experience hassle-free living!"  
  location="/rentProperties"
/>
<ComCard
 title="Own Your Dream Home"
 description="Explore our exclusive listings of homes for sale. Whether you're looking for a modern condo or a charming house, we have the ideal property to make your dream of homeownership a reality. Begin your journey to owning the perfect home today!"
location="/saleProperties"
/>
</div>
    <div className='statisticsBGColor d-flex justify-content-around pt-4 pb-5 flex-wrap'>
    <Statistic
    numOfProperty={saleCount+'000000'}
    description="Properties for Sale"
    icon={faHouse}
    />
    <Statistic
       numOfProperty={rentCount+'000000'} //'450000000'
       description="Properties for Rent"
       icon={faKey}
       />
   <Statistic
       numOfProperty= {statisfiedCustCount+'000000'}// '5000000000'
       description="Statisfied Clients"
       icon={faSmile}
       />
     

    </div>
    
    <div className='FeaturedTitle'>
    <h1 className='text-center'>Featured Properties</h1>

   <Link to='/AllProperties' className='exploreLink'>Explore all <FontAwesomeIcon  className='text-center ml-2 mt-2' icon={faArrowRight}  size='lg' color="#fd650b" /></Link>
    </div>
    <div className='rentSaleNav'>
        <a
         
          onClick={() => handleFilter('allProperties')}
          style={{ color: activeLink === 'allProperties' ? '#fd650b' : 'black' }}
        >
          All Properties
        </a>
        <a
         
          onClick={() => handleFilter('rent')}
          style={{ color: activeLink === 'rent' ? '#fd650b' : 'black' }}
        >
          For Rent
        </a>
        <a
         
         onClick={() => handleFilter('sale')}
         style={{ color: activeLink === 'sale' ? '#fd650b' : 'black' }}
       >
         For Sale
       </a>
      </div>

    <div className='d-flex flex-wrap'>
     
    {filteredProperties.map((property) => (
        <Product
          key={property._id}
          property={property}
        />
      ))}
      
    </div>
      <div id='contactUs'>

<ContactUsForm />
      </div>

    </>
    );
}
 
export default HomePage;
