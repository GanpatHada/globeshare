import "./Notification.css";
import Logo from '../../images/mainLogoMin.svg'
import { IoIosClose } from "react-icons/io";
import {useNotification} from '../../hooks/useNotification'

const Notification = () => {
  const {hide,notification}= useNotification()

  const getTypeColor=()=>{
    switch(notification.type){
        case 'info' : return '#00487d';
        case 'success' : return '#006900';
        case 'error' : return '#d70000';
        default : return 'default'
    }
  }

  return (
    <div id="notification">
      <aside>
        <img src={Logo} alt="G" />
      </aside> 
      <button onClick={hide} id="close-notification"><IoIosClose /></button>
      <div>
        <header>
        <h4 style={{color:getTypeColor()}}>{notification?.content?.heading || 'Globeshare says'}</h4>
      </header>
      <main>{notification?.content?.info || ''}</main>
      </div>
    </div>
  );
};

export default Notification;
