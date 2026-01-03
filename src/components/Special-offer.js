import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Special-offer.css";

const SpecialOffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/offers")
      .then((response) => {
        const shuffled = [...response.data].sort(() => Math.random() - 0.5);
        setOffers(shuffled.slice(0, 4));
      })
      .catch((error) => console.error("Error fetching offers:", error))
      .finally(() => setLoading(false));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  if (loading)
    return <p className="offers__loading">Loading special offers...</p>;
  if (offers.length === 0)
    return <p className="offers__loading">No offers available right now.</p>;

  return (
    <section id="special-offers" className="offers">
      <h2 className="offers__heading">Special Offers</h2>
      <div className="offers__grid">
        {offers.map(({ id, place_name, slogan, image }, i) => (
          <Link to={`/offers/${id}`} key={id} className="offers__link">
            <motion.div
              className="offers__card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{
                scale: 1.08,
                rotateX: 6,
                rotateY: 8,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
            >
              <span className="offers__badge">Special</span>
              <img
                src={`http://localhost:5000/uploads/${image}`}
                alt={place_name}
                className="offers__image"
              />
              <h3 className="offers__title">{place_name}</h3>
              <p className="offers__slogan">{slogan}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffersSection;
