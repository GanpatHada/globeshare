import { useState } from "react";
import "./ForgetPassword.css";
import { useNotification } from "../../hooks/useNotification";
import { sendPasswordResetEmail } from "firebase/auth";
import validator from "validator";
import { auth } from "../../assets/Firebase";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const navigate=useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      notify(
        {
          heading: "Invalid Email",
          info: "Please enter a valid email address.",
        },
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      notify(
        {
          heading: "Email Sent",
          info: "A password reset link has been sent to your email address.",
        },
        "success",
        5000
      );
      navigate("/auth")
      setEmail("");
    } catch (error) {
      notify(
        {
          heading: "Error",
          info: error.message?.includes("user-not-found")
            ? "Email is not registered with globeshare"
            : "Something went wrong while sending the email.",
        },
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="forget-password-page">
      <div className="box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleFormSubmit}>
          <h4>Enter your registered email</h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="abc@gmail.com"
            type="email"
            autoComplete="username"
          />
          <button disabled={email.trim().length === 0 || loading} type="submit">
            {loading ? "Sending Email..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
