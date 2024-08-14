import React,{useEffect,useState} from "react";
import Product from "../component/cards/productCard";
import { Select } from "antd";

const SalePropertyPage = () => {
    
    const [properties , setproperties]=useState([]);
    const [compoundNames,setCoumpoundNames]=useState([]);
    const [filteredProperties,setFilteredProperties]=useState([]);

    const constructCompoundNames = () => {
        const uniqueCompoundNames = new Set(properties.map(property => property.compound));
        setCoumpoundNames(Array.from(uniqueCompoundNames));
       
        
      };

      const handleFilterChange=(value)=>{
        console.log("selected property",value);
        if (value==='All'){
          setFilteredProperties(properties);
        }
        else {
          setFilteredProperties(properties.filter(property=>property.compound===value));
        }
  
      }

      useEffect(() => {
        const fetchPropeties= async()=>{
          const baseUrl = process.env.REACT_APP_BASE_URL;
          const response = await fetch(`${baseUrl}/property/getSaleProperties`);
       
            const data = await response.json();
            if (!response.ok){
                throw new Error("error in geting properties");
            }
         
            setproperties(data.propertiesSale);
            setFilteredProperties(data.propertiesSale);
        
           
          
        };
        fetchPropeties();
        },[]);

        useEffect(() => {
          constructCompoundNames();
        }, [properties]);
  
    return (  
<div className="customMargin">
<Select
        style={{ width: 200, marginLeft: '16px' }}
        onChange={handleFilterChange}
        placeholder="Select a compound"
       

      >
        <Select.Option key="all" value="All">
          All
        </Select.Option>
        {compoundNames.map((compound, index) => (
          <Select.Option key={index} value={compound}>
            {compound}
          </Select.Option>
        ))}
      </Select>
        <div className=' d-flex flex-wrap'>
        
    
        {filteredProperties.map((property) => (
            <Product
              key={property._id}
              property={property}
            />
          ))}
          
        </div>
        </div>

    );
}
 
export default SalePropertyPage;