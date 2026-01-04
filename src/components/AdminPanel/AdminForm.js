import React, { useEffect, useState } from "react";
import "./AdminForm.css";

const AdminForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://taae-backend.onrender.com/api/forms")
      .then((res) => res.json())
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="admin-forms">
      <h2 className="admin-title">Contact Form Submissions</h2>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-msg">{error}</p>}
      {!loading && forms.length === 0 && (
        <p className="empty-text">No submissions found.</p>
      )}

      {!loading && forms.length > 0 && (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead className="admin-thead">
              <tr className="admin-tr">
                <th className="admin-th">#</th>
                <th className="admin-th">Name</th>
                <th className="admin-th">Email</th>
                <th className="admin-th">Phone</th>
                <th className="admin-th">Message</th>
                <th className="admin-th">Date</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr className="admin-tr" key={form.id}>
                  <td className="admin-td">{index + 1}</td>
                  <td className="admin-td">{form.name}</td>
                  <td className="admin-td">{form.email}</td>
                  <td className="admin-td">{form.phone_number}</td>
                  <td className="admin-td message-cell">{form.message}</td>
                  <td className="admin-td date-cell">
                    {new Date(form.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View */}
          <div className="mobile-view">
            {forms.map((form, index) => (
              <div className="mobile-card" key={form.id}>
                <div className="card-row">
                  <span className="card-label">#</span>
                  <span className="card-value">{index + 1}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Name</span>
                  <span className="card-value">{form.name}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Email</span>
                  <span className="card-value">{form.email}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Phone</span>
                  <span className="card-value">{form.phone_number}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Message</span>
                  <span className="card-value">{form.message}</span>
                </div>
                <div className="card-row">
                  <span className="card-label">Date</span>
                  <span className="card-value">
                    {new Date(form.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForms;
