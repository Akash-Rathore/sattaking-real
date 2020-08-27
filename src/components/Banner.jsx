import React from "react";
import '../App.css';
import logo from "../images/logo-1.png";
const Banner = () => {


  return (
        <>
           <div className="header container-fluid pt-1 p-2">
                  <div className="logo d-flex justify-content-center">
                     <a><img src={logo}  style={{maxWidth:"100%" , height:"110px"}} alt="logo" /></a>
                  </div>  
           </div>
      </>);
};

export default Banner;
