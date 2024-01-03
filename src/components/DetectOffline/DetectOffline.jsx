import React from 'react';
import Style from './DetectOffline.module.css';
import { Offline, Online } from "react-detect-offline";

export default function DetectOffline() {
  return <>
<div>
   
   <Offline>
     <div className="network rounded w-100 text-center fw-bolder ">you are offline please check your connection <i className='fas fa-wifi'></i></div>
   </Offline>
 </div>
  
  </>
}
