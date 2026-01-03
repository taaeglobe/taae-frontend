import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./AuthForm.css";

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );
      const user = res.data.user;

      // Save user and token to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);

      setUser(user);
      alert("Login successful!");

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed!");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <div className="password-input-wrapper">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="toggle-password-icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/register">Register Here</a>
      </p>
    </div>
  );
};

export default Login;
