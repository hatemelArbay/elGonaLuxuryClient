import React, {useContext} from 'react';
import {useNavigate,Link} from'react-router-dom'
import { jwtDecode } from "jwt-decode";
import {message } from "antd"

import AuthContext from '../../store/authContext';

const LoginForm = () => {
  

    

    const authContext = useContext(AuthContext);
    const navigate = useNavigate();


     const submitHandler = (e) => {
  
        e.preventDefault();
        const formData = new FormData(e.target);
        const formPayload = Object.fromEntries(formData);

        if (formPayload.email === '' || formPayload.pass === '') {
           
            message.error('Please enter all the fields');
           
        }

        
        
   
       else {
       submitData(formPayload);
       console.log(formPayload);
       }

    };
 
    const submitData= async (formPayload)=>{
        const baseUrl = process.env.REACT_APP_BASE_URL;
        console.log("submitted data "+JSON.stringify(formPayload));
        try{
            const response = await fetch(`${baseUrl}/login`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(formPayload)

            });
        
            const responseData=await response.json();
            console.log(responseData);

          
             if(responseData.status === false){
                // setStatus(false);
                message.error('Wrong credentials');
            }else{
                // setStatus(true);
                const decoded = jwtDecode(responseData.jwt);
   
                authContext.login(decoded.email,decoded.userId,responseData.jwt,decoded.role);
                const { email, userId ,token,role} = decoded;
             
                if(role==="user"){
                    const redirectTo = localStorage.getItem('redirectAfterLogin') || '/';
                    console.log(redirectTo);
                  
                    localStorage.removeItem('redirectAfterLogin');
                
                
                    navigate(redirectTo);

                }
                else 
                navigate('/adminDashboard');
                
            
            }
            

            
            }catch(err){
                console.log("error in sending request "+err);
            }

    }

    return (    
        <section className="min-h-screen flex items-center justify-center pt-20 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="pass" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""/>
                        </div>
                     
                        <button type="submit" className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? 
                            <Link to="/signUP" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
      
    );
}

export default LoginForm;
