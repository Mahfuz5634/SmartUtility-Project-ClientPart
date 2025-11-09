
import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import { Outlet } from 'react-router';


const MainLayout = () => {
    return (
        <div>
           <div className='container mx-auto'>
             <Navbar></Navbar>
           </div>
           <div className='min-h-screen flex flex-1'>
            <Outlet></Outlet>
           </div>
           <Footer></Footer>

        </div>
    );
};

export default MainLayout;