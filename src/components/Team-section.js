import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Team-section.css";

const TeamSection = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("https://taae-backend.onrender.com/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data));
  }, []);

  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {team.map(({ _id, name, role, phone, email, image }, i) => (
          <motion.div
            className="team-card"
            key={_id}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 16px 30px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={`https://taae-backend.onrender.com/uploads/${image}`}
              alt={name}
              className="avatar-img"
            />
            <h3>{name}</h3>
            <p className="role">{role}</p>
            <p className="contact">📞 {phone}</p>
            <p className="contact">✉️ {email}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
