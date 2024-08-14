import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import WOW from 'wowjs';
import 'wowjs/css/libs/animate.css';
import AuthProvider from './store/authProvider';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider> 
    <App />
    </AuthProvider> 
     
);


