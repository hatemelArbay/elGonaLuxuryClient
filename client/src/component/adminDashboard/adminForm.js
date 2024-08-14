import React, { useState } from "react";
import { message } from 'antd';

const AdminForm = () => {
    const [loading, setLoading] = useState(false);
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const phoneRegex = /^[0-9]{11}$/; 
 
        const formData = new FormData(event.target);
        const values = Object.fromEntries(formData.entries());
         console.log(values);
         const {pass,repeatPass,phoneNum}=values
        if(pass!==repeatPass){
             message.error("Password do not match")
        }
        else if(pass.length<8)
            message.error("Password must be at least 8 characters")
     
        else if (!phoneRegex.test(phoneNum))
            message.error("Enter a valid phone number")
        else {
            try{
            // setLoading(true);
            const formData = {
                fname:values.fname,
                lname:values.lname,
                email:values.email,
                phoneNum:values.phoneNum,
                pass:values.pass,
                role:"admin"

            }

            const baseUrl = process.env.REACT_APP_BASE_URL;
            const response = await fetch(`${baseUrl}/signUp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              });
            const responseData = await response.json();

            if(responseData){
             
               if(responseData.response==="User already exists"){
                message.error("User already exists");
               }
                else {
                message.success("Admin added successfully");
                }

            }
          
            // setLoading(false);
        }catch(err){
            console.log("error in adding new admin : "+err);
        }
        }


    };
    return ( 

        <div className="flex flex-col items-center justify-center my-5 px-4">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">Add Admin</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="fname" className="text-sm font-medium mb-2">First Name</label>
                <input
                  id="fname"
                  name="fname"
                  type="text"
                  placeholder="Enter first name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="lname" className="text-sm font-medium mb-2">Last name</label>
                <input
                  id="lname"
                  name="lname"
                  type="text"
                  placeholder="Enter Last name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-2">email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="phoneNum" className="text-sm font-medium mb-2">Phone number</label>
                <input
                  id="phoneNum"
                  name="phoneNum"
                  type="text"
                  placeholder="Enter phone number"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="pass" className="text-sm font-medium mb-2">Password</label>
                <input
                  id="pass"
                  name="pass"
                  type="password"
                  placeholder="Enter number of beds"
                  className="p-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label htmlFor="repeatPass" className="text-sm font-medium mb-2">Repeat password</label>
                <input
                  id="repeatPass"
                  name="repeatPass"
                  type="password"
                  placeholder="Enter number of showers"
                  className="p-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
  
            
  
            
  
            </div>
  
      
  
            <div className="flex justify-center">
           
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Add Property'}
              </button>
            </div>
          </form>
        </div>
      </div>

     );
}
 
export default AdminForm;