import React, { useState } from "react";
import DestinationsSection from "../Destination-section";

function Destination() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* Search Bar Container */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <input
          type="text"
          placeholder="🔍 Search your dream destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 20px",
            width: "100%",
            maxWidth: "500px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            outline: "none",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease-in-out",
          }}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px #007bff44")}
          onBlur={(e) =>
            (e.target.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.05)")
          }
        />
      </div>

      {/* Destination List */}
      <DestinationsSection
        limit={null}
        searchTerm={searchTerm}
        shuffled={true}
      />
    </>
  );
}

export default Destination;
