import React from "react";
import { motion } from "framer-motion";

const services = [
  { title: "Flight Booking", icon: "✈️" },
  { title: "Visa Guide", icon: "🛂" },
  { title: "Bus Booking", icon: "🚌" },
  { title: "Cable Car Tickets", icon: "🚡" },
  { title: "Hotel Booking", icon: "🏨" },
  { title: "Trekking & Tours", icon: "🥾" },
];

const iconHoverAnimation = {
  rotate: [0, 15, -15, 10, -10, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  },
};

const cardHoverAnimation = {
  scale: [1, 1.1, 0.95, 1.05, 1],
  transition: {
    duration: 0.6,
    ease: "easeInOut",
  },
};

const ServicesSection = () => {
  return (
    <section
      id="services"
      style={{
        padding: "4rem 2rem",
        textAlign: "center",
        background: "#f3f4f6",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Our Services</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {services.map(({ title, icon }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              delay: i * 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            whileHover={cardHoverAnimation}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              cursor: "pointer",
              userSelect: "none",
              fontSize: "1.2rem",
              willChange: "transform",
              fontStyle: "normal",
            }}
          >
            <motion.div
              style={{ fontSize: "3rem", marginBottom: "0.75rem" }}
              whileHover={iconHoverAnimation}
            >
              {icon}
            </motion.div>
            <h3 style={{ fontStyle: "normal" }}>{title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
