import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

function Login({ signin }) {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");
  const navigateTo = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    //Preventing sending empty data to server
    if (loginUserName === "" || loginPassword === "") {
      setLoginStatus("Credentials don't exist!");
      return;
    }

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
        if (
          data.message === "" ||
          loginUserName === "" ||
          loginPassword === ""
        ) {
          setLoginStatus("Credentials don't exist!");
        } else {
          signin();
          navigateTo("/home");
        }
      })
      .catch((error) => {
        console.error("Error", error);
        throw error;
      });
  };

  const checkLoginStatus = () => {
    const cookies = document.cookie.split("; ");
    console.log(cookies);
    const loggedInUser = cookies.find((cookie) => cookie.startsWith("userId="));
    if (loggedInUser) {
      signin();
      navigateTo("/home");
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
              <span className={`${styles.displayMessage} ${statusHolder}`}>
                {loginStatus}
              </span>
            )}
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
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              onClick={loginUser}
            >
              <span> Login </span>
              <AiOutlineSwapRight className={styles.loginIcon} />
            </button>
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
