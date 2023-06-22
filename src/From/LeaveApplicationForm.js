 
import React, { useState, useEffect } from 'react';
import axios from '../services/leaveService';
import userService from '../services/userService';
import leaveService from '../services/leaveService';

const LeaveApplicationForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [department, setDepartment] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [duration, setDuration] = useState('');
  const [availableLeaves, setAvailableLeaves] = useState({ casual: 2, sick: 2 });

  useEffect(() => {
    // Fetch users data from the backend
    const fetchUsers = async () => {
      try {
        const response = await userService.getUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedUser(selectedUser);

    // Find the user in the users array and set the department
    const user = users.find((user) => user._id === selectedUser);
    if (user) {
      setDepartment(user.department);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate leave duration
      if (!duration) {
        console.error('Leave duration is required');
        return;
      }

      // Validate if the user has enough available leaves
      const leaveCount = leaveType === 'sick' ? availableLeaves.sick : availableLeaves.casual;
      if (duration > leaveCount) {
        console.error(`Insufficient ${leaveType} leaves`);
        return;
      }

      // Make API call to create a leave request
      await leaveService.applyLeave({ userid: selectedUser, department, leaveType, duration });
      // TODO: Handle successful leave request

      // Update the available leaves count
      setAvailableLeaves((prevLeaves) => ({
        ...prevLeaves,
        [leaveType]: prevLeaves[leaveType] - duration,
      }));
    } catch (error) {
      alert('Error creating leave request:' + String(error?.response?.data?.error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave Request Form</h2>
      <label>
        Username:
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        Department:
        <input type="text" value={department} disabled />
      </label>
      <label>
        Leave type:
        <select value={leaveType} onChange={(event) => setLeaveType(event.target.value)}>
          <option value="">Select Leave Type</option>
          <option value="SICK">Sick</option>
          <option value="CASUAL">Casual</option>
        </select>
      </label>
      <label>
        Duration:
        <input type="number" value={duration} onChange={(event) => setDuration(parseInt(event.target.value, 10))} />
      </label>
      <button type="submit">Submit</button>
      <p>Available Sick Leaves: {availableLeaves.sick}</p>
      <p>Available Casual Leaves: {availableLeaves.casual}</p>
    </form>
  );
};

export default LeaveApplicationForm;


// ---------------------------------