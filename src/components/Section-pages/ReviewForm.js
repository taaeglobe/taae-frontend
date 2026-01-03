import React, { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);

  const handleStarClick = (value) => {
    setStars(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews/", {
        username,
        description,
        stars,
      });
      alert("Review submitted successfully!");
      setUsername("");
      setDescription("");
      setStars(0);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>

      <label htmlFor="username">Name</label>
      <input
        type="text"
        id="username"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Rating</label>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= stars ? "star filled" : "star"}
            onClick={() => handleStarClick(value)}
          >
            ★
          </span>
        ))}
      </div>

      <label htmlFor="description">Review</label>
      <textarea
        id="description"
        placeholder="Write your experience..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
