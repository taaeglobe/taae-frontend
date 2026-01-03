import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserFetch.css"; // Simple CSS file

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const api = axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("https://taae-backend.onrender.com/api/users");
      // Filter users here to only those with role === 'user'
      const onlyUsers = res.data.filter((u) => u.role.toLowerCase() === "user");
      setUsers(onlyUsers);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id, currentStatus) => {
    try {
      await api.put(`https://taae-backend.onrender.com/api/users/${id}/status`, {
        active: !currentStatus,
      });
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, active: !currentStatus } : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search input (only for role user as already filtered)
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
  );

  if (loading) return <p className="loading">Loading users...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-container">
      <h2>Admin - User Management</h2>

      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>

            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || "N/A"}</td>

                <td>
                  <span
                    className={`status ${user.active ? "active" : "inactive"}`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn ${user.active ? "deactivate" : "activate"}`}
                    onClick={() => toggleUserStatus(user.id, user.active)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
