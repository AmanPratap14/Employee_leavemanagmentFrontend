import React, { useState } from 'react';
import './LeaveApplicationForm.css';


const LeaveApplicationForm = ({ users, applyLeave }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDuration, setStartDuration] = useState('');
  const [endDuration, setEndDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeave({ username: selectedUser, leaveType, duration: `${startDuration}-${endDuration}` });
    setSelectedUser('');
    setLeaveType('');
    setStartDuration('');
    setEndDuration('');
  };
  
    // LeaveApplicationForm.js

// ...

return (
  <form className="leave-application-form" onSubmit={handleSubmit}>
    <select
      value={selectedUser}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      {users.map(user=> <option value={user.username}>{user.username}</option>)}
    </select>
    <select
      value={leaveType}
      onChange={(e) => setLeaveType(e.target.value)}
    >
      <option value={''}>Leave Type</option>
      <option value={'CASUAL'}>CASUAL</option>
      <option value={'SICK'}>SICK</option>
    </select>
    Date Form:
    <input
      type="date"
      placeholder="Duration"
      value={startDuration}
      onChange={(e) => setStartDuration(e.target.value)}
    />
    Date To: 
     <input
      type="date"
      placeholder="Duration"
      value={endDuration}
      onChange={(e) => setEndDuration(e.target.value)}
    />
    <button type="submit">Submit</button>
  </form>
);

};

export default LeaveApplicationForm;
