import React from 'react';

const RentModal = ({ isOpen, onClose, bookingDetails,onConfirm}) => {
  if (!isOpen) return null;

  const { startDate, endDate, pricePerNight,totalPrice } = bookingDetails;
  const handleConfirm = () => {
    onConfirm();  
    onClose();    
  };

  

  return (
    <div 
      id="default-modal" 
      tabIndex="-1" 
      aria-hidden="true" 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Booking Confirmation</h3>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg 
              className="w-5 h-5" 
              aria-hidden="true" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {/* Modal body */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Start Date:</span>
            <span className="text-gray-500">{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">End Date:</span>
            <span className="text-gray-500">{new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Price Per Night:</span>
            <span className="text-gray-500">${pricePerNight}</span>
          </div>
          <div className="flex justify-between border-t pt-4">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className="text-gray-500 font-semibold">${totalPrice}</span>
          </div>
        </div>
        {/* Modal footer */}
        <div className="flex justify-end mt-6 space-x-4">
          <button 
            type="button" 
            onClick={handleConfirm}
           
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentModal;
