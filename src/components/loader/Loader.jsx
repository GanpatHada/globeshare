import React from "react";
import "./Loader.css";
import loader from "../../images/mainLogoMin.svg";
import mainLogoText from "../../images/mainLogoText.svg";
const Loader = ({ info }) => {
  return (
    <div id="loader-page" className="all-centered">
      <section className="all-centered" id="main-logo-section">
        <img src={loader} alt="" />
      </section>
      <section id="main-logo-text-section">
        <img src={mainLogoText} alt="" />
      </section>
      <section id="app-version-section">
         <p>Version 1.01</p>
      </section>
      {/* <p>{info ?? "Please Wait"}</p> */}
    </div>
  );
};

export default Loader;
