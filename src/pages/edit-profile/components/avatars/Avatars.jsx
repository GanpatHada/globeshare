import React, { useContext, useState } from "react";
import "./Avatars.css";
import av1 from "../../../../images/av-1.png";
import av2 from "../../../../images/av-2.png";
import av3 from "../../../../images/av-3.png";
import av4 from "../../../../images/av-4.png";
import av5 from "../../../../images/av-5.png";
import av6 from "../../../../images/av-6.png";
import av7 from "../../../../images/av-7.png";
import av8 from "../../../../images/av-8.jpg";
import av9 from "../../../../images/av-9.jpg";
import tick from '../../../../images/tick.svg'
import { ModalContext } from "../../../../contexts/ModalContext";
const Avatars = ({updateDetails,setUpdateDetails}) => {
  const{closeProfileModal}=useContext(ModalContext)
  const avt = [av1, av2, av3, av4, av5, av6, av7, av8, av9];

  const handleAvatarClick=(av)=>{
    setUpdateDetails({...updateDetails,profilePhoto:av})
    closeProfileModal()
  }
  
  //returns index of avatar if it is selcted
  const curAvSelected=avt.findIndex(a=>a===updateDetails.profilePhoto)
  
  return (
    <div id="avatars-box">
      {avt.map((av, index) => {
        return (
          <div className={`avatar-image ${index===curAvSelected&&'av-wrapper'}`} onClick={()=>handleAvatarClick(av)}>
            <img src={av} alt="" />
            {index===curAvSelected&&<img id="tick" src={tick} alt="" />}
          </div>
        );
      })}
    </div>
  );
};

export default Avatars;
