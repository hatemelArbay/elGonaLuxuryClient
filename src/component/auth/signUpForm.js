import React, { useState } from 'react';
import { Link ,Navigate, useNavigate} from 'react-router-dom';
import {message} from "antd";

const SignUpForm = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [userExistErr,setUserExistErr] = useState();
     const nagvigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formPayload = Object.fromEntries(formData.entries());
        formPayload.role = 'user'; 
        console.log(formPayload);

        const errors = validateForm(formPayload);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setValidationErrors({});
       submitForm(formPayload);
    };

    const validateForm = (formData) => {
        const errors = {};

        if (!formData.fname || formData.fname.trim() === '') {
            errors.fname = 'First Name is required';
        }

        if (!formData.lname || formData.lname.trim() === '') {
            errors.lname = 'Last Name is required';
        }

        if (!formData.pass || formData.pass.length < 5) {
            errors.pass = 'Password must be at least 5 characters long';
        }

        if (formData.pass !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        const phoneRegex = /^[0-9]{11}$/; 
        if (!phoneRegex.test(formData.phoneNum)) {
            errors.phoneNum = 'Please insert a valid phone number';
        }

        return errors;
    };
const submitForm= async (formPayload)=>{
try{    
    console.log(formPayload);
    const baseUrl =process.env.REACT_APP_BASE_URL;
    const response = await fetch(`${baseUrl}/signUp`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPayload)
    });
    const responseData = await response.json();
    
    console.log(responseData);
    if(responseData.response==="User already exists"){
        message.error("User already exists");
    }else {
        nagvigate('/logIn');
    }


}catch(err){
    console.log("error in sending request to the server : "+err);
}

}
    return (
        <section className="customMargin bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form onSubmit={submitHandler} className="space-y-4 md:space-y-6">
                        {/* {userExistErr &&  <div className="alert alert-danger text-center container-fluid" role="alert">{userExistErr}</div>} */}
                        <div className="flex flex-col md:flex-row md:space-x-4">
                            <div className="w-full md:w-1/2">
                                {validationErrors.fname && <div className="text-red-500">{validationErrors.fname}</div>}
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input type="text" name="fname" id="first-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                            </div>
                            <div className="w-full md:w-1/2">
                                {validationErrors.lname && <div className="text-red-500">{validationErrors.lname}</div>}
                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input type="text" name="lname" id="last-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                            </div>
                        </div>
                        <div>
                            {validationErrors.email && <div className="text-red-500">{validationErrors.email}</div>}
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            {validationErrors.phoneNum && <div className="text-red-500">{validationErrors.phoneNum}</div>}
                            <label htmlFor="phoneNum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                            <input type="text" name="phoneNum" id="phoneNum" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01*********" required />
                        </div>
                        <div>
                            {validationErrors.pass && <div className="text-red-500">{validationErrors.pass}</div>}
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="pass" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            {validationErrors.confirmPassword && <div className="text-red-500">{validationErrors.confirmPassword}</div>}
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="/logIn" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignUpForm;
