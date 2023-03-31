import React, { useState } from "react";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";

export default function Registerscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long ,should have one capital letter and one symbol ");
      return false;
    }
    if (password !== cpassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const register = async () => {
    if (validateForm()) {
      const user = {
        name,
        email,
        password,
      };

      try {
        setLoading(true);
        const result = await axios.post("/api/users/register", user);
        setLoading(false);
        setSuccess("User registered successfully");
        setEmail("");
        setName("");
        setCpassword("");
        setPassword("");
      } catch (error) {
        setError("Email already registered");
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
          {loading && <Loader />}
          {success && <Success success={success} />}
          {error && <Error error={error} />}

          <h2 className="text-center m-2" style={{ fontSize: "35px" }}>
            Register
          </h2>
          <div>
            <label>Name</label>
            <input
              required
              type="text"
              placeholder="name"
              className="form-control mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="email"
              className="form-control mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              className="form-control mt-1"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              className="form-control mt-1"
              value={cpassword}
              required
              onChange={(e) => setCpassword(e.target.value)}
            />
            <button
              onClick={register}
              className="btn btn-primary rounded-pill mt-3 mb-3"
            >
              REGISTER
              </button>
    </div>
  </div>
</div>
</div>
  );
}
