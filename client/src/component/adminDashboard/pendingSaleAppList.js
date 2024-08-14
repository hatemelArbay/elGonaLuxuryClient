import React, { useEffect, useState } from "react";
import { Table,} from "antd";
import Button from 'react-bootstrap/Button';
import AppointmentList from './appointmentList';
import emailjs from '@emailjs/browser';
const PendingSaleAppList = () => {
    const [appointments,setAppointments] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [refresh , setRefresh] = useState();
    
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/appointment/getPendingApps`);
                const responseData = await response.json();
                // console.log(responseData);
               
              
                const appointments=responseData.pendingAppointments;
                const salePending = appointments.filter((app) => {
                    if (!app.propertyId) {
                        return false;
                    }
                    return app.propertyId.propertyType.includes("sale");
                });
                setAppointments(salePending);
                
                console.log("pending Sales : "+JSON.stringify(salePending));
               
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
            setRefresh(prev => !prev);
            sendEmail(id);
          
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
                    
                    console.log(data);
                    const date = new Date(data.startDate);
                    const formattedDate = date.toLocaleDateString();
                    const time=data.time;
                    const location = data.propertyId.location;
                    const compound= data.propertyId.compound ;
                    const name = data.userId.fname;
                    const email = data.userId.email;
                    console.log(date, location, name, email,compound,time);
                    const subject="Appointment Confirmation from elGonaLuxury"
                    const message =`We are pleased to confirm your appointment with elGonaLuxury. Below are the details of your appointment:

Date: ${formattedDate}
Time: ${time}
Compound:${compound} 
Address:${location}


Please ensure to arrive a few minutes before the scheduled time. If you need to reschedule or have any questions about your appointment, do not hesitate to contact us at 01023100148 or visit our website at www.elGonaLuxury.com.

We look forward to meeting you and assisting with your property needs.`
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
                  
                    const dataSource = appointments
                    .map(appointment => ({
                      key: appointment._id,
                      image: appointment.propertyId.coverImgUrl,
                      propertyName: appointment.propertyId.propertyName,
                      propertyCompound: appointment.propertyId.compound,
                      from:appointment.startDate,
                      time:appointment.time,
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
                            title: "time",
                            dataIndex: "time",
                          
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
                                        onChange: setSelectedRowKeys
                                    }}
                                    columns={columns}
                                    dataSource={dataSource}
                                    rowKey="_id" // Ensure each row has a unique key
                                    scroll={{ x: '100%' }} // Enables horizontal scrolling on smaller screens
                                />
                            </div>
                        </div>
                    );
                    
}
 
export default PendingSaleAppList;