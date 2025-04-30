import React, { useEffect, useState } from 'react';
import axios from 'axios';

const firebaseUrl = "https://your-firebase.firebaseio.com/users";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${firebaseUrl}.json`);
      if (res.data) {
        const formattedUsers = Object.entries(res.data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(formattedUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Validate form
  const validate = () => {
    const { name, email } = form;
    if (!name.trim() || !email.trim()) {
      setError("Both fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  // Add or Edit User
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (editingId) {
        await axios.patch(`${firebaseUrl}/${editingId}.json`, form);
        setEditingId(null);
      } else {
        await axios.post(`${firebaseUrl}.json`, form);
      }
      setForm({ name: "", email: "" });
      setError("");
      fetchUsers();
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit user.");
    }
  };

  // Edit Mode
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditingId(user.id);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${firebaseUrl}/${id}.json`);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete user.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>User Management System</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <br />
        <button type="submit">{editingId ? "Update" : "Add"} User</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
