import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Destination-section.css";

const DestinationsSection = ({
  limit = 6,
  searchTerm = "",
  shuffled = true,
}) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://taae-backend.onrender.com/api/popular-destinations")
      .then((response) => {
        let data = response.data;

        // Filter by search term if present
        if (searchTerm.trim()) {
          data = data.filter((d) =>
            d.place_name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Shuffle if limit is used
        if (shuffled) {
          data = [...data].sort(() => Math.random() - 0.5);
        }
        if (limit) {
          data = [...data].sort(() => Math.random() - 0.5).slice(0, limit);
        }

        setDestinations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch destinations:", error);
        setLoading(false);
      });
  }, [limit, searchTerm, shuffled]);

  if (loading) return <p>Loading destinations...</p>;
  if (destinations.length === 0)
    return <p>No popular destinations available.</p>;

  return (
    <section id="destinations" className="destinations-section">

      <div className="destinations-grid">
        {destinations.map(({ id, place_name, description, image }, i) => (
          <Link
            to={`/popular-destinations/${id}`}
            key={id}
            className="popular-link"
          >
            <motion.div
              className="destination-card"
              key={id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
            >
              <img
                src={`https://taae-backend.onrender.com/uploads/${image}`}
                alt={place_name}
                className="destination-image"
              />
              <h3>{place_name}</h3>
              <p className="description-truncate">{description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DestinationsSection;
