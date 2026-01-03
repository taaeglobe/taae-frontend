import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./AuthForm.css";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <div className="password-input-wrapper">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login Here</a>
      </p>
    </div>
  );
};

export default RegisterForm;
