import React, { useState } from "react";
import "./Contact-Us.css";

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to send data
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Us</h2>
      {submitted ? (
        <p className="thank-you-msg">
          Thank you for contacting us! We'll get back soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phoneNumber"
            placeholder="Your Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      )}
      <div className="contact-links">
        <a
          href="https://wa.me/yourwhatsapplink"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-link"
        >
          WhatsApp
        </a>
        <a href="#" className="facebook-link">
          Facebook
        </a>
      </div>
    </section>
  );
};

export default ContactUsSection;
