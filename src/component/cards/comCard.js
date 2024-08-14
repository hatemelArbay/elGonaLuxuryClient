import React from 'react';
import { Link } from 'react-router-dom';

const ComCard = ({ title, description,location }) => {
    return (
        <div 
            className="max-w-sm h-90 p-6 border border-gray-200 rounded-2xl shadow dark:bg-gray-800 dark:border-gray-700"    
            style={{ 
                maxWidth: '500px', 
                backgroundColor:'rgb(255 224 206 / 59%)'
            }}
        >
            <h5 className="m-3 mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                {title}
            </h5>
            <p className="m-3 mt-7 mb-8 font-normal text-gray-700 dark:text-gray-400 text-center">
                {description}
            </p>
            <div className="flex justify-center mt-10">
                <Link to={location} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Explore
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default ComCard;
