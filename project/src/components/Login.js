import React from "react";
import { useState } from "react";
import { services } from "../service/fetchService";
import "../styles/login.scss";
export default function Login() {
  const [view, setView] = useState("login");
  const [isLogged, setIsLogged] = useState(false);
  const[regStatus, setRegStatus] = useState("")

  function loginHandler(e) {
    e.preventDefault();
    console.log("email = ", e.target.elements.username.value);
    console.log("password = ", e.target.elements.password.value);
     services
       .loginService({
         username: e.target.elements.username.value,
         password: e.target.elements.password.value,
       })
       .then((e) => e.json())
       .then((e) => {
         if (e.success) {
           setIsLogged(true);
         }
       });
  }

  function registerHandler(e) {
    e.preventDefault();
    services
      .registerService({
        email: e.target.elements.email.value,
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
      .then((e) => e.json())
      .then((e) => {
        setRegStatus(e.message);
     
      });
  }
  function resetHandler(e) {
    e.preventDefault();
    console.log("email = ", e.target.elements.email.value);
  }
  switch (view) {
    case "login":
      return (
        <div className="login">
          <form onSubmit={loginHandler}>
            {!isLogged ? <h2>Login</h2> : <h2>Welcome You Have Logged In</h2>}

            <fieldset>
              {/* <legend>Log In</legend> */}
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" required name="username" />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    required
                    name="password"
                  />
                </li>
                <li>
                  <i />
                  <a onClick={() => setView("PWReset")}>Forgot Password?</a>
                </li>
              </ul>
            </fieldset>
            <button type="submit">Login</button>
            <button type="button" onClick={() => setView("register")}>
              Create an Account
            </button>
          </form>
        </div>
      );
    case "register":
      return (
        <div className="login">
          <form onSubmit={registerHandler}>
            <h2>Sign Up!</h2>
            <p>{regStatus}</p>
            <fieldset>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id="username" required />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required name="email" />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" required />
                </li>
              </ul>
            </fieldset>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setView("login")}>
              I Already Have an Account
            </button>
          </form>
        </div>
      );
    case "PWReset":
      return (
        <div className="login">
          <form onSubmit={resetHandler}>
            <h2>Reset Password</h2>
            <fieldset>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required name="email" />
                </li>
              </ul>
            </fieldset>
            <button type="submit">Reset</button>
            <button type="button" onClick={() => setView("login")}>
              Go Back
            </button>
          </form>
        </div>
      );
    default:
      return <></>;
  }
}
