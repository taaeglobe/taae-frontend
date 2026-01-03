import React from "react";
import { motion } from "framer-motion";
import "./Hero-section.css";
import { TypeAnimation } from "react-type-animation";
const HeroSection = () => (
  <section id="home" className="hero-section">
    <motion.div
      className="hero-content"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1>Travel Adventure and Explore Globe</h1>
      <TypeAnimation
        sequence={[
          "Your Gateway to Memorable Journeys 😄😄",
          1000, // pause 1s at end
        ]}
        wrapper="p"
        speed={50}
        className="typing-effect"
        repeat={Infinity}
      />
      <a href="#services" className="hero-button">
        Explore Services
      </a>
    </motion.div>
  </section>
);

export default HeroSection;
