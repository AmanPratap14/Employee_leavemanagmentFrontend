import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import leaveService from './services/leaveService';

const Dashboard = ({userLeaves}) => { 

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <h3>My Leaves</h3>
      {userLeaves.map((user) => (
        
        <div className="dashboard-item" key={userLeaves._id}>
          <p>{user.username}</p>
          <p>{user.department}</p>
          {
            user.leave_list.map(leave=> (
              <><p>Leave Type: {leave.leaveType}</p><p>Duration: {leave.duration}</p></>
            ))
          }
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
