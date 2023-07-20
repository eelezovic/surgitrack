import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa";
import { Axios } from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:8000/register", {
      Email: email,
      UserName: userName,
      Password: password
    }).then(() => {
      console.log("User has been created")
    })
  }

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.formDiv}>
          <div className={styles.headerDiv}>
            <h3> Let Us Know You!</h3>
          </div>
          <form action="" className={styles.formGrid}>
            <div className={styles.inputDiv}>
              <label htmlFor="email"> Email </label>
              <div className={styles.inputFlex}>
                <MdMarkEmailRead className={styles.userIcon} />
                <input
                  className={styles.userName}
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
              <label htmlFor="username"> Username </label>
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
              <label htmlFor="password">Password</label>
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

            <button type="submit" className={styles.registerButton} onClick={createUser}>
              <span> Register </span>
              <AiOutlineSwapRight className={styles.registerIcon} />
            </button>

            <span className={styles.forgotPassword}>
              Forgot your password? <a href=""> Click Here </a>
            </span>
          </form>
        </div>

        <div className={styles.footerDiv}>
          <span className={styles.footerText}> Have an account?</span>
          <Link to={"/"}>
            <button className={styles.signUpButton}> Login </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
