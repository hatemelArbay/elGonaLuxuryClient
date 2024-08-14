import React from 'react'; 
import { Outlet } from 'react-router-dom';
import NavBar from './navBar';
import Footer from './footer';
const Layout = () => {
    return ( 
        <>
        <NavBar/>
        <Outlet/>
        <Footer/>
        </>
     );
}
 
export default Layout;