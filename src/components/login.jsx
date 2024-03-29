import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function Login({ onLogin }) {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigateTo = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const loginUser = async (event) => {
    event.preventDefault();
    //Preventing sending empty data to server
    if (loginUserName === "" || loginPassword === "") {
      setLoginStatus("Credentials don't exist!");
      return;
    }

    const response = await fetch(`${apiBaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      }),
    });
    if (response.status === 400) {
      setLoginStatus("Username or Password is Incorrect!");
      return;
    }

    const data = await response.json();

    if (data.message === "" || loginUserName === "" || loginPassword === "") {
      setLoginStatus("Credentials don't exist!");
    } else {
      await onLogin();
      navigateTo("/dashboard");
    }
  };

  const onSubmit = () => {
    setLoginUserName("");
    setLoginPassword("");
    setLoginStatus("");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.formDiv}>
          <div className={styles.headerDiv}>
            <h3>Welcome Back!</h3>
          </div>
          <form action="" className={styles.formGrid} onSubmit={onSubmit}>
            {loginStatus && (
              <span className={`${styles.displayMessage}`}>{loginStatus}</span>
            )}
            <div className={styles.inputDiv}>
              <label className={styles.userNameLabel} htmlFor="username"> Username </label>
              <div className={styles.inputFlex}>
                <FaUserShield className={styles.userIcon} />
                <input
                  className={styles.userName} 
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.passwordLabel}  htmlFor="password">Password</label>
              <div className={styles.inputFlex}>
                <BsFillShieldLockFill className={styles.userIcon} />
                <input
                  className={styles.userName}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className={styles.loginButtonContainer}>
              <button
              type="submit"
              className={styles.loginButton}
              onClick={loginUser}
            >
              <span> Login </span>
              <AiOutlineSwapRight className={styles.loginIcon} />
            </button>
            </div>
          </form>
        </div>

        <div className={styles.footerDiv}>
          <span className={styles.footerText}>Don't have an account?</span>
          <Link to={"/register"}>
            <button className={styles.signUpButton}>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
