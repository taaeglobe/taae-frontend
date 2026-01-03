import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./OfferDetail.css";

// Format the description like in mobile version
function formatText(rawText) {
  return rawText
    .replace(
      /(📍|💵|Day \d+:|🗓|🌅|🏞️|💃|🍽️|🐘|🍳|🦓|🎁|📸|🔁|🚗|🏯|🌿|📷|🍛|🛕|🪷|🚐|🛍️|🚤|🌄|☕|🎯)/g,
      "\n$1"
    )
    .replace(/ {2,}/g, "\n")
    .replace(/\n+/g, "\n")
    .trim();
}

// ExpandableText component
function ExpandableText({ text }) {
  const [expanded, setExpanded] = useState(false);
  const previewLines = 5;

  const formattedText = formatText(text);
  const lines = formattedText.split("\n");

  const displayedLines = expanded ? lines : lines.slice(0, previewLines);

  return (
    <div className="expandable-text">
      {displayedLines.map((line, index) => {
        const trimmedLine = line.trim();
        const isDayLine = /^Day \d+/i.test(trimmedLine);

        return (
          <p
            key={index}
            className={isDayLine ? "day-highlight" : ""}
            style={{ margin: "8px 0" }}
          >
            {trimmedLine}
          </p>
        );
      })}
      {lines.length > previewLines && (
        <button
          className="read-more-button"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less ▲" : "Read More ▼"}
        </button>
      )}
    </div>
  );
}

// Main Component
const OfferDetail = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://taae-backend.onrender.com/api/offers/${id}`).then((res) => {
      setOffer(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!offer) return <p className="not-found">Offer not found.</p>;

  return (
    <>
      <div className="offer-detail-container">
        <div className="offer-detail-image-wrapper">
          <img
            src={`https://taae-backend.onrender.com/uploads/${offer.image}`}
            alt={offer.place_name}
            className="offer-detail-image"
          />
        </div>
        <h1 className="offer-title">{offer.place_name}</h1>
        <h3 className="offer-slogan">{offer.slogan}</h3>

        <div className="description-section">
          <h4>About this destination</h4>
          <ExpandableText
            text={offer.description || "No description available."}
          />
        </div>
      </div>
    </>
  );
};

export default OfferDetail;
