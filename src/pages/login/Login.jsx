import React, { useState } from "react";
import "./Login.css";
import { ToastContainer,toast,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  Info  from "./authComponents/Info";
import LoginBox from "./authComponents/LoginBox";
import SignupBox from "./authComponents/SignupBox";





const Login = () => {
  const [page, setPage] = useState("login");
  return (
    <div id="login-page" className="all-centered">
      <aside className="all-centered">
        <Info/>
      </aside>
      <main id="login-main">
        {page === "login" ? (
          <LoginBox setPage={setPage} />
        ) : (
          <SignupBox setPage={setPage} />
        )}
      </main>
      <ToastContainer
        position={"top-center"} autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true} closeOnClick={true} rtl={false}
        pauseOnFocusLoss={true} draggable={false} pauseOnHover={true} theme={"light"}
        transition={Slide}
      />
    </div>
  );
};

export default Login;
