import React, { useEffect ,useState} from 'react';
import Product from '../component/cards/productCard';

import { Select } from "antd";

const AllPropertiesPage = () => {
    const [properties , setproperties]=useState([]);
    const [compoundNames,setCoumpoundNames]=useState([]);
    const [filteredProperties,setFilteredProperties]=useState([]);

    const constructCompoundNames = () => {
        const uniqueCompoundNames = new Set(properties.map(property => property.compound));
        setCoumpoundNames(Array.from(uniqueCompoundNames));
       
        
      };
      
      useEffect(() => {
        constructCompoundNames();
      }, [properties]);
    
    useEffect(() => {
        const fetchPropeties= async()=>{
          const baseUrl = process.env.REACT_APP_BASE_URL;
          const response = await fetch(`${baseUrl}/property/getProperties`);
       
            const data = await response.json();
            if (!response.ok){
                throw new Error("error in geting properties");
            }
            console.log(data);
            setproperties(data.properties);
            setFilteredProperties(data.properties);
        
           
          
        };
        fetchPropeties();
        },[]);

        const handleFilterChange=(value)=>{
            console.log("selected property",value);
            if (value==='All'){
              setFilteredProperties(properties);
            }
            else {
              setFilteredProperties(properties.filter(property=>property.compound===value));
            }
      
          }

        const handleFilterTypeChange=(value)=>{
            if (value==='All'){
                setFilteredProperties(properties);
              }
              else {
                setFilteredProperties(properties.filter(property=>property.propertyType===value));
              }
        }

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

                  <Select
                    style={{ width: 200, marginLeft: '16px' }}
                    onChange={handleFilterTypeChange}
                    placeholder="Select Property type"
                   
            
                  >
                    <Select.Option key="all" value="All">
                      All
                    </Select.Option>
                    <Select.Option key="rent" value="rent">
                      Rent
                    </Select.Option>
                    <Select.Option key="sale" value="sale">
                      Sale
                    </Select.Option>
                  </Select>
                    <div className=' d-flex flex-wrap mt-3'>
                    
                
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
 
export default AllPropertiesPage;