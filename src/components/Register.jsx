import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_APP_API;

  const createUser = (event) => {
    event.preventDefault();

    if (!email || !userName || !password) {
      alert("Please fill out all fields!");
      return false;
    }

    return fetch(`${apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        UserName: userName,
        Password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.message === "User with this email or username already exists."
        ) {
          // Display the alert message
          alert(data.message);
        } else {
          navigateTo("/login"); // Redirecting to the login page
          setEmail("");
          setUserName("");
          setPassword("");
          console.log("User has been created", data);
        }
        return data;
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        throw error;
      });
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.formDiv}>
          <div className={styles.headerDiv}>
            <h3> Let Us Know You!</h3>
          </div>
          <form action="" className={styles.formGrid}>
            <div className={styles.inputDiv}>
              <label className={styles.emialLabel} htmlFor="email"> Email </label>
              <div className={styles.inputFlex}>
                <MdMarkEmailRead className={styles.userIcon} />
                <input
                  className={styles.userEmail}
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            </div>

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
                    setUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className={styles.inputDiv}>
              <label className={styles.passwordLabel} htmlFor="password">Password</label>
              <div className={styles.inputFlex}>
                <BsFillShieldLockFill className={styles.userIcon} />
                <input
                  className={styles.userName}
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
            </div>
           <div className={styles.registerButtonContainer}>
            <button
              type="submit"
              className={styles.registerButton}
              onClick={createUser}
            >
              <span> Register </span>
              <AiOutlineSwapRight className={styles.registerIcon} />
            </button>
            </div>
          </form>
        </div>

        <div className={styles.footerDiv}>
          <span className={styles.footerText}> Have an account?</span>
          <Link to={"/login"}>
            <button className={styles.signUpButton}> Login </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
