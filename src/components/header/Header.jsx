import "./Header.css";
import globeshareLogo from "../../images/mainLogoText.svg";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate=useNavigate()
  return (
    <header id="top-header">
      <div onClick={()=>navigate("/")} id="logo-section" style={{transform:`translateY(${"0px"})`}}>
        <img src={globeshareLogo} alt="" />
      </div>
    </header>
  );
};

export default Header;
