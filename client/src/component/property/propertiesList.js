import React, { useEffect, useState } from "react";
import { Table, Select, Switch } from "antd";
import Button from 'react-bootstrap/Button';

const { Option } = Select;



const PropertiesList = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [filterValue, setFilterValue] = useState("all");
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [refresh, setRefresh] = useState();
    

    const handleFilterChange = (value) => {
        setFilterValue(value);
        if (value === "all") {
            setFilteredProperties(properties);
        } else {
            const filtered = properties.filter(property => property.propertyType === value);
            setFilteredProperties(filtered);
        }
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/property/getProperties`);
                const responseData = await response.json();
                setProperties(responseData.properties || []);
                setFilteredProperties(responseData.properties || []);
                console.log("called");
            } catch (err) {
                console.log("Error in fetchProperties:", err);
            }
        };
        fetchProperties();
    }, [refresh]);

  
    const handleSwitchChange = async (checked, id) => {
     
       
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${baseUrl}/property/setPropertyFeatured?propertyId=${id}&featuredType=${checked}`);
            const responseData = await response.json();
            console.log(responseData);
        }catch(err){
        console.log("error in changing property featured type : "+err);
        }

        setFilteredProperties(prevFilteredProperties =>
            prevFilteredProperties.map(item =>
                item._id === id ? { ...item, featured: checked } : item
            )
        );
        setProperties(prevProperties =>
            prevProperties.map(item =>
                item._id === id ? { ...item, featured: checked } : item
            )
        );


    };

    const handleButton=async()=>{
        console.log("Selected row keys:", selectedRowKeys);
     
        for(let i = 0; i < selectedRowKeys.length; i++){
        try {
            const baseUrl = process.env.REACT_APP_BASE_URL;
         
          const response = await fetch(`${baseUrl}/property/deleteProperty?propertyId=${selectedRowKeys[i]}`, {
            method: "DELETE"
          });
      
            if (!response.ok) {
              throw new Error("Failed to delete property");
            }
            
            const data = await response.json();
            console.log("delete property response :", data);
            
           
          }catch (err) {
          console.error(err);
        }
        
       
        
      }
    
      if(refresh===true){
       return setRefresh(false);
    }
    else {
        return setRefresh(true);
    }
      
      
    };
    const columns = [
        {
            title: "Photo",
            dataIndex: "coverImgUrl",
            render: (text) => <img src={text} alt="Property" style={{ width: 50, height: 50 }} />
        },
        {
            title: "Name",
            dataIndex: "propertyName",
        },
        {
            title: "Compound",
            dataIndex: "compound",
        },
        {
            title: "Type",
            dataIndex: "propertyType",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Featured",
            dataIndex: "featured",
            render: (text, record) => (
                <Switch
                checked={!!text} 
                onChange={(checked) => handleSwitchChange(checked, record._id)}
            />
            ),
        }
    ];

    return (
        <div className="p-2 md:p-4">
            <div className="flex flex-col md:flex-row items-center md:m-4 space-y-2 md:space-y-0">
                {/* Dropdown */}
                <Select
                    value={filterValue}
                    style={{ width: '100%', maxWidth: 200 }}
                    onChange={handleFilterChange}
                >
                    <Option value="all">All</Option>
                    <Option value="rent">Rent</Option>
                    <Option value="sale">Sale</Option>
                </Select>
            </div>
    
           
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys
                }}
                columns={columns}
                dataSource={filteredProperties}
                rowKey="_id"
                scroll={{ x: '100%' }} 
            />
            <div className="flex justify-end">
                <Button onClick={handleButton} className="m-2 md:m-4" variant="outline-primary">
                    Delete Property
                </Button>
            </div>
        </div>
    );
    
};

export default PropertiesList;
