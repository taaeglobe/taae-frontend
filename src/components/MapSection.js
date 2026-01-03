import React from "react";
import "./MapSection.css"; // Optional: your custom styles

const MapSection = () => {
  return (
    <section id="map-location" className="map-section">
      <h2>📍Our Office Location</h2>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113178.34174275107!2d83.40263739469236!3d27.567997633454343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f46627969365ff3%3A0xf7fd59181a75bc05!2sTravel%20Adventure%20And%20Explore%20Globe!5e0!3m2!1sne!2snp!4v1753420396639!5m2!1sne!2snp"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
