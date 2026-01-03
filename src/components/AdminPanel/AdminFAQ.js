import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminFAQ.css";

const AdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ id: null, question: "", answer: "" });

  useEffect(() => {
    fetchFAQs();
  }, []);
  const fetchFAQs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/faqs");
      setFaqs(res.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };
  console.log(form.answer);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        question: form.question,
        answer: form.answer,
      };
      if (form.id) {
        await axios.put(`http://localhost:5000/api/faqs/${form.id}`, data);
      } else {
        await axios.post("http://localhost:5000/api/faqs", data);
      }

      setForm({ id: null, question: "", answer: "" });
      fetchFAQs();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const handleEdit = (faq) => {
    setForm(faq);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/faqs/${id}`);
        fetchFAQs();
      } catch (error) {
        console.error("Error deleting FAQ:", error);
      }
    }
  };

  return (
    <div className="admin-faq-container">
      <h2>📝 Manage FAQs</h2>

      <form onSubmit={handleSubmit} className="faq-form">
        <input
          type="text"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          required
        />
        <textarea
          placeholder="Answer"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          required
        />
        <button type="submit">{form.id ? "Update FAQ" : "Add FAQ"}</button>
      </form>

      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-card">
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
            <div className="faq-actions">
              <button onClick={() => handleEdit(faq)}>✏️ Edit</button>
              <button onClick={() => handleDelete(faq.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ;
