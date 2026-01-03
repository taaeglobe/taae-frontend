import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DestinationDetail.css";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/popular-destinations/${id}`)
      .then((res) => setDestination(res.data))
      .catch((err) => console.error("Error fetching detail:", err));
  }, [id]);

  if (!destination) return <div className="loading">Loading...</div>;

  const { place_name, description, image } = destination;

  return (
    <>
      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img
            src={`http://localhost:5000/uploads/${image}`}
            alt={place_name}
            className="detail-image"
          />
        </div>

        <h1 className="detail-title">{place_name}</h1>

        <div className="detail-section">
          <h2>About this destination</h2>
          <p className={`detail-description ${expanded ? "expanded" : ""}`}>
            {description}
          </p>
          <button
            className="toggle-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less ▲" : "Read More ▼"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DestinationDetail;
