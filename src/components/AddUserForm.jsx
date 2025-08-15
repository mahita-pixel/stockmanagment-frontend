
// components/AddUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [userData, setUserData] = useState({ name: '', email: '', role: 'user' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/add', userData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding user');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUserForm;
