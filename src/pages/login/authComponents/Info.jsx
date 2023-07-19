import '../Login.css'
import React from 'react'
import globeshare from '../../../images/globeshare.svg'
const Info = () => (
      <div>
        <h1 style={{ justifyContent: "flex-start" }} className="all-centered">
           <img src={globeshare} alt="" />
        </h1>
        <p>
          Let's connect with your friends across the globe through{" "}
          <strong>globeshare</strong>{" "}
        </p>
      </div>
    
  );
export default Info