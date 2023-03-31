import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import Swal from "sweetalert2";

export default function Loginscreen() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  async function login() {
    // Validate email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      seterror(true);
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      seterror(true);
      return;
    }

    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const result = await (await axios.post("/api/users/login", user)).data;
      localStorage.setItem("currentUser", JSON.stringify(result));
      window.location.href = "/";
    } catch (error) {
      seterror(true);
      setloading(false);
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Login
          </h2>

          {loading && <Loader />}
          {error && (
            <Error error="Invalid Credentials. Please make sure your email contains @ symbol and your password contains at least one capital letter, one symbol and one small letter, and is at least 8 characters long." />
          )}
          {success && <Success success="User Login Successfull" />}
          <div>
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button
              onClick={login}
              className="btn btn-success mt-3 mb-3 rounded-pill"
            >
              LOGIN
            </button>
            <br />
            <a
              style={{ color: "black" }}
              href="/register"
              className="mt-2"
            >
              Click Here To Register
            </a>
            <br/>
            <a
              style={{ color: "black" }}
              href="/admin"
              className="mt-2"
            >
              Admin?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
