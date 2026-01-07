import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import DestinationsSection from "../Destination-section";
import "./Destination.css";

function Destination() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Helmet>
        <title>Popular Travel Destinations | Travel Adventure & Explore Globe</title>
        <meta
          name="description"
          content="Discover popular travel destinations, tour packages, and holiday trips with Travel Adventure & Explore Globe."
        />
      </Helmet>

      <h1 className="page-title">Popular Travel Destinations</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search your dream destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search destinations"
        />
      </div>

      <DestinationsSection
        limit={null}
        searchTerm={searchTerm}
        shuffled={true}
      />
    </>
  );
}

export default Destination;
