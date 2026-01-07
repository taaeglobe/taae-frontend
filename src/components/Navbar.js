import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
    // Optional: window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
        <img src="../logo.png" alt="TAE Globe Travel Agency Logo" />
        </a>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/special-offers">Offers</Link>
        <Link to="/destinations">Popular Destinations</Link>

        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <div className="user-dropdown" ref={dropdownRef}>
            <span className="user-greet" onClick={toggleDropdown}>
              Hi, {user.name}
            </span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a href="/profile">My Profile</a>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
