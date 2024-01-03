import React, { useContext, useEffect } from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';

import { Outlet } from 'react-router-dom';
import { userContext } from '../Context/UserContext';
import DetectOffline from '../DetectOffline/DetectOffline';

export default function Layout() {

  let {setuserToken}=useContext(userContext);
  useEffect(()=>{
    if (localStorage.getItem('userToken')!==null) {
      setuserToken(localStorage.getItem('userToken'))
      
    }
  }
  ,[])

  return <>

 <Navbar></Navbar>

 
<DetectOffline/>
 <div className="container">

 <Outlet></Outlet>

 </div>
  

  

  
  </>
}
