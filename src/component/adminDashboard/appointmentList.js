import React, { useEffect, useState } from "react";
import { Table,} from "antd";
import Button from 'react-bootstrap/Button';
import emailjs from '@emailjs/browser';

const AppointmentList = () => {
    const [appointments,setAppointments] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [refresh , setRefresh] = useState();
 
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/appointment/getPendingApps`);
                const responseData = await response.json();
              
                const appointments=responseData.pendingAppointments;
                const salePending = appointments.filter((app) => {
                    if (!app.propertyId) {
                        return false;
                    }
                    return app.propertyId.propertyType.includes("rent");
                });
                setAppointments(salePending);
               
            } catch (err) {
                console.log("Error in fetchProperties:", err);
            }
        };
        fetchProperties();
    }, [refresh]);

    const handleAccept=async(id)=>{
try{
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${baseUrl}/appointment/acceptApp?appId=${id}`);
    sendEmail(id);
    setRefresh(prev => !prev);
   
  
}catch(err){
    console.log("error in accepting appointment:", err);
}

    }
    const handleReject=async(id)=>{
        console.log("id : "+id);
        try{
            const baseUrl = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${baseUrl}/appointment/acceptApp?appId=${id}`);
            setRefresh(prev => !prev);
          
        }catch(err){
            console.log("error in accepting appointment:", err);
        }
        
            }
        
            const sendEmail = async(id)=>{
                try{
                    const baseUrl = process.env.REACT_APP_BASE_URL;
                    const response = await fetch(`${baseUrl}/appointment/getAppDetails?appId=${id}`);
                    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json(); 
                    // console.log("data : "+JSON.stringify(data));
                   
                    const name = data.userId.fname;
                    const email = data.userId.email;
                    let date = new Date(data.startDate);
                    const formattedStartDate = date.toLocaleDateString();
                    date = new Date(data.endDate);
                    const formattedEndDate = date.toLocaleDateString();
    
                    const time=data.time;
                    const location = data.propertyId.location;
                    const compound= data.propertyId.compound ;
                    const propertyName= data.propertyId.propertyName;
        
                    
               
                    console.log(formattedStartDate,formattedEndDate,propertyName, location, name, email,compound);
                    const subject="Booking Confirmation from elGonaLuxury"
                    const message =` We are pleased to confirm your appointment with elGonaLuxury. Below are the details of your appointment:
    
    Start Date: ${formattedStartDate}
    End Date: ${formattedEndDate}
    Compound: ${compound}
    Address: ${location}
    
   If you need to reschedule or have any questions about your appointment, do not hesitate to contact us at 01023100148 or visit our website at www.elGonaLuxury.com.`
                    emailjs
                    .send(
                      'service_9ymekll', // paste your ServiceID here (you'll get one when your service is created).
                      'template_v39w1xb', // paste your TemplateID here (you'll find it under email templates).
                      {
                        to_name: name,// put your name here.
                        to_email: email,
                        suject:subject,
                        message:message,
    
                  
                      },
                      '7CHJ5K3dA2WKCthuj' //paste your Public Key here. You'll get it in your profile section.
                    )
                }catch(err){
                    console.log("unable to send email: " + err);
                }
               
                
            
            }


    const dataSource = appointments
    .map(appointment => ({
      key: appointment._id,
      image: appointment.propertyId.coverImgUrl,
      propertyName: appointment.propertyId.propertyName,
      propertyCompound: appointment.propertyId.compound,
      from:appointment.startDate,
      to:appointment.endDate,
      clientName: `${appointment.userId.fname} ${appointment.userId.lname}`,
      clientEmail: appointment.userId.email,
      clientPhoneNum:appointment.userId.phoneNum
   
    }))
 

    const columns = [
        {
            title: "Photo",
            dataIndex: "image",
            render: (text) => <img src={text} alt="Property" style={{ width: 50, height: 50 }} />
        },
        {
            title: "Name",
            dataIndex: "propertyName",
        },
        {
            title: "Compound",
            dataIndex: "propertyCompound",
        },{
            title: "From",
            dataIndex: "from",
            render: (text) => {
                // Convert the text to a Date object
                const date = new Date(text);
                
                // Format the date in YYYY-MM-DD format
                return date.toLocaleDateString('en-US'); // Adjust the locale and options as needed
            }
        },{
            title: "To",
            dataIndex: "to",
            render: (text) => {
                // Convert the text to a Date object
                const date = new Date(text);
                
                // Format the date in YYYY-MM-DD format
                return date.toLocaleDateString('en-US'); // Adjust the locale and options as needed
            }
        },
        {
            title: "Client Name",
            dataIndex: "clientName",
        },
        {
            title: "Client Email",
            dataIndex: "clientEmail",
        },
        {
            title: "Client Number",
            dataIndex: "clientPhoneNum",
        }, {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div>
                    <Button 
                        type="primary" 
                        onClick={() => handleAccept( record.key)}
                        style={{ marginRight: 8 }}
                    >
                        Accept
                    </Button>
                    <Button 
                        type="danger" 
                        onClick={() => handleReject( record.key)}
                    >
                        Reject
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-2 md:p-4">
            {/* Table and Button components */}
            <div className="overflow-x-auto">
                <Table
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="_id" // Ensure each row has a unique key
                    scroll={{ x: '100%' }} // Enables horizontal scrolling for smaller screens
                />
            </div>
        </div>
    );
    
}
 
export default AppointmentList;