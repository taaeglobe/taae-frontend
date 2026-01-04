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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://taae-backend.onrender.com/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        phoneNumber: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          {error && <p className="error-msg">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
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

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      <div className="contact-links">
        <a
          href="https://wa.me/98056009459"
          target="_blank"
          rel="noreferrer"
          className="whatsapp-link"
        >
          WhatsApp
        </a>

        <a
          href="https://www.facebook.com/Taeglobes"
          target="_blank"
          rel="noreferrer"
          className="facebook-link"
        >
          Facebook
        </a>
      </div>
    </section>
  );
};

export default ContactUsSection;
