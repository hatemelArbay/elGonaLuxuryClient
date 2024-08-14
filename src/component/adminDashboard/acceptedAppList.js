import React, { useEffect, useState } from "react";
import { Table,} from "antd";

const AcceptedAppList = () => {
    const [appointments,setAppointments] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL;
                const response = await fetch(`${baseUrl}/appointment/getAcceptedApps`);
                const responseData = await response.json();
            //   console.log(JSON.stringify(responseData));
            
            const acceptedAppointments=responseData.acceptedAppointments;
            const acceptedRentAppointments = acceptedAppointments.filter((app) => {
                if (!app.propertyId) {
                    return false;
                }
                return app.propertyId.propertyType.includes("rent");
            });
                setAppointments(acceptedRentAppointments);
               
            } catch (err) {
                console.log("Error in fetchProperties:", err);
            }
        };
        fetchProperties();
    }, []);

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
 
export default AcceptedAppList;