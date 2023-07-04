import '../Login.css'
import googleIcon from '../../../images/google-icon.svg'
const GoogleButton = () => {
    return (
      <button id="google-btn" className="all-centered login-page-btns">
        <img src={googleIcon} id="google-icon" alt="" /> Login with Google
      </button>
    );
  };
export default GoogleButton;  
