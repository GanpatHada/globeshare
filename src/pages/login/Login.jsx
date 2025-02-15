import React, { useEffect, useState } from "react";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";
import Info from "./authComponents/Info";
import LoginBox from "./authComponents/LoginBox";
import SignupBox from "./authComponents/SignupBox";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [page, setPage] = useState("login");
  const{startLoading}=useUser();
  useEffect(()=>{
     startLoading();
  },[])

  return (
    <div id="login-page" className="all-centered">
      <aside className="all-centered">
        <Info />
      </aside>
      <main id="login-main">
        {page === "login" ? (
          <LoginBox setPage={setPage} />
        ) : (
          <SignupBox setPage={setPage} />
        )}
      </main>
    </div>
  );
};

export default Login;
