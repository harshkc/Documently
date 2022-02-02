import React from "react";
import "./Login.css";
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../../firebase";
import useStyles from "./styles";
import Logo from "../../assets/logo.png";

function Login() {
  const {loginContainer, content} = useStyles();

  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={loginContainer}>
      <div className={content}>
        <img src={Logo} alt='logo' height='150px' width='150px' />
        <span style={{fontWeight: "bold", fontSize: "28px"}}>Documently</span>
        <p style={{fontSize: "16px", margin: "1rem 0 2rem 0", color: "gray", textAlign: "center"}}>
          Document Your Transactions and Daily Journals
          <br />
          At Single Place
        </p>
        <div onClick={handleSubmit} className='google-btn'>
          <div className='google-icon-wrapper'>
            <img
              className='google-icon'
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              alt='google-icon'
            />
          </div>
          <p className='btn-text'>
            <b>Login with Google</b>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
