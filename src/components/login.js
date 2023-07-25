import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function Login() {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginUser = (event) => {
    event.preventDefault()
    return fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("", data);
        return data;  
      })
      .catch((error) => {
        console.error("", error);
        throw error; 
      });
  };


  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.formDiv}>
          <div className={styles.headerDiv}>
            <h3>Welcome Back!</h3>
          </div>
          <form action="" className={styles.formGrid}>
            {/*<span className={styles.displayMessage}> Login Status... </span>*/}
            <div className={styles.inputDiv}>
              <label htmlFor="username"> Username </label>
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
              <label htmlFor="password">Password</label>
              <div className={styles.inputFlex}>
                <BsFillShieldLockFill className={styles.userIcon} />
                <input
                  className={styles.userName}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value)
                  }}
                />
              </div>
            </div>

            <button type="submit" className={styles.loginButton} onClick={loginUser}>
              <span> Login </span>
              <AiOutlineSwapRight className={styles.loginIcon} />
            </button>

            <span className={styles.forgotPassword}>
              Forgot your password? <a href=""> Click Here </a>
            </span>
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
