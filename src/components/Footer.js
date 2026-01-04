import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-about">
        <h3>Travel Adventure and Explore Globe</h3>
        <p>
          We provide affordable flight booking, visa guidance, trekking, hotel
          booking, and Nepal tour packages with the best deals and service.
        </p>
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#destinations">Destinations</a>
          </li>
          <li>
            <a href="#special-offers">Special Offers</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
      </div>

      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>📞 +977-9856009459</p>
        <p>📞 +977-9867209459</p>
        <p>✉️ taaeglobe@gmail.com</p>
        <div className="social-icons">
          <a href="https://www.facebook.com/Taeglobes" target="_blank" rel="noreferrer">
            🌐 Facebook
          </a>
          <a href="https://instagram.com/Taeglobes" target="_blank" rel="noreferrer">
            📸 Instagram
          </a>
          <a href="https://wa.me/9856009459" target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>
        &copy; 2025 Travel Adventure and Explore Globe. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
