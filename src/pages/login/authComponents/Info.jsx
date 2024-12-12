import '../Login.css'
import React from 'react'
import globeshare from '../../../images/mainLogoText.svg'
const Info = () => (
      <div id='globeshare-info'>
        <section className="main-logo">
        <img src={globeshare} alt="" />
        </section>
        <p>
          Let's connect with your friends across the globe through{" "}
          <strong>globeshare</strong>{" "}
        </p>
      </div>
    
  );
export default Info