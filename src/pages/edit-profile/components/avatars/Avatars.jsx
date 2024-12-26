import { IoCheckmarkOutline } from "react-icons/io5";
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
import { useContext } from "react";
import { EditProfileContext } from "../../../../contexts/EditProfileContext";
const Avatars = ({closeModal}) => {
  const{dispatch,state:{updatedProfile:{profilePhoto}}}=useContext(EditProfileContext)
  const avt=[av1,av2,av3,av4,av5,av6,av7,av8,av9];
  const handleAvatarClick=async(av)=>{
      dispatch({type:'SET_FIELD',payload:{field:'profilePhoto',value:{type:'AVATAR',url:av}}});
      setTimeout(()=>{
          closeModal()
      },200)
  }
  
  return (
    <div id="avatars-box">
      {avt.map((av, index) => {
        return (
          <div className={`avatar-image`} key={index} onClick={()=>handleAvatarClick(av)}>
            {profilePhoto?.url===av&&<div id="selected-avatar" className="all-centered"> 
            <IoCheckmarkOutline />
            </div>}
            <img src={av} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Avatars;
