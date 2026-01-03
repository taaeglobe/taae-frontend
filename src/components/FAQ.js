import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FAQ.css";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await axios.get("https://taae-backend.onrender.com/api/faqs");
      const sortedFaqs = res.data.sort((a, b) => a.id - b.id);
      setFaqs(sortedFaqs);
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
    }
  };

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="faq-container" id="faq">
      <h2 className="faq-title">❓ Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={faq.id} className="faq-item-frontend">
          <div
            className={`faq-question-frontend ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            {faq.question}
            <span className="arrow-frontend">{activeIndex === index ? "▲" : "▼"}</span>
          </div>
          <div className={`faq-answer-frontend ${activeIndex === index ? "show" : ""}`}>
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
