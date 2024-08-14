import './App.css';
import './index.css';
import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';


import LoginPage from './Pages/loginPage';
import HomePage from './Pages/homePage';
import SignUpPage from './Pages/signUpPage';
import Layout from './component/layout/layout';
import RentPropertiesPage from './Pages/rentPropertiesPage';
import RentProperyDetailsPage from './Pages/rentPropertyDetailsPage';
import SalePropertyPage from './Pages/salePropertyPage';
import SalePropertyDetailsPage from './Pages/salePropertyDetails';
import AdminPage from './Pages/adminPage';
import AllPropertiesPage from './Pages/allPropertiesPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signUp' element={<SignUpPage/>}/>
    <Route path='/rentProperties' element={<RentPropertiesPage/>}/>
    <Route path='/rentPropertyDescription' element={<RentProperyDetailsPage/>}/>
    <Route path='/saleProperties' element={<SalePropertyPage/>}/>
    <Route path='/salePropertyDescription' element={<SalePropertyDetailsPage/>}/>
    <Route path='/adminDashboard' element={<AdminPage/>}/>
    <Route path='/AllProperties' element={<AllPropertiesPage/>}/>
    


  </Route>
  )
);


function App() {
  // const apiUrl = process.env.REACT_APP_API_URL;

  // console.log(apiUrl); 
  return (
  
    <RouterProvider router={router} />
   
  );
}

export default App;
