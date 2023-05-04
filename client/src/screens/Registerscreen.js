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
  const [progress, setProgress] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handleNameChange = (e) => {
    setName(e.target.value);
    setProgress(25);
    setProgressPercentage(25);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setProgress(50);
    setProgressPercentage(50);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setProgress(75);
    setProgressPercentage(75);
  };
  
  const handleCpasswordChange = (e) => {
    setCpassword(e.target.value);
    setProgress(100);
    setProgressPercentage(100);
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
          {progressPercentage > 0 && (
            <div className="progress">
              <div
  className="progressBar"
  role="progressbar"
  style={{ width: `${progressPercentage}%` }}
  aria-valuenow={progress}
  aria-valuemin="0"
  aria-valuemax="100"
></div>

                </div>
                )}
                <h2 className="text-center">Register</h2>
                <form>
                <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                             type="text"
                             className="form-control"
                             id="name"
                             placeholder="Enter name"
                             value={name}
                             onChange={handleNameChange}
                           />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email address:</label>
                <input
                             type="email"
                             className="form-control"
                             id="email"
                             placeholder="Enter email"
                             value={email}
                             onChange={handleEmailChange}
                           />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                             type="password"
                             className="form-control"
                             id="password"
                             placeholder="Enter password"
                             value={password}
                             onChange={handlePasswordChange}
                           />
                </div>
                <div className="form-group">
                <label htmlFor="cpassword">Confirm Password:</label>
                <input
                             type="password"
                             className="form-control"
                             id="cpassword"
                             placeholder="Confirm password"
                             value={cpassword}
                             onChange={handleCpasswordChange}
                           />
                </div>
                <button type="button" className="btn btn-primary" onClick={register}>
                Submit
                </button>
                </form>
                </div>
                </div>
                </div>
                );
                }
