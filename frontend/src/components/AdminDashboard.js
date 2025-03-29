import '../styles/AdminDashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is passed for authentication
          },
        });
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle "Back to Login" button click
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <h2>User List</h2>

      {/* Table for displaying user data */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back to Login Button */}
      <button onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};

export default AdminDashboard;
