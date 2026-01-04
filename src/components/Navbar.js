import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
        <img src="../logo.png" alt="main-logo" />
        </a>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/special-offers">Offers</a>
        <a href="/destinations">Popular Destinations</a>

        {!user ? (
          <a href="/login">Login</a>
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
