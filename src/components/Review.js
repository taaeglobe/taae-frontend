import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./Review.css"; // Create this new file for improved styles

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/reviews/").then((res) => {
      // Get only the latest 3 reviews
      setReviews(res.data.slice(0, 3));
    });
  }, []);

  return (
    <div className="home-review-section">
      <h2>What People Say</h2>
      <div className="home-review-list">
        {reviews.map((rev) => (
          <div key={rev.id} className="home-review-card">
            <strong>{rev.username}</strong>
            <div className="home-review-stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  size={16}
                  color={num <= rev.stars ? "gold" : "lightgray"}
                />
              ))}
            </div>
            <p>{rev.description}</p>
          </div>
        ))}
      </div>
      <button className="review-button" onClick={() => navigate("/review")}>
        Wanna review?
      </button>
    </div>
  );
};

export default Review;
