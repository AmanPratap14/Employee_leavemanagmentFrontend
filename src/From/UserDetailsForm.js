import React, { useState } from 'react';
import './UserDetailsForm.css';



const UserDetailsForm = ({ addUser }) => {
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ username, department });
    setUsername('');
    setDepartment('');
  };
    return (
      <form className="user-details-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
};

export default UserDetailsForm;
