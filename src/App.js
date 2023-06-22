import './App.css';
import React, { useEffect, useState } from 'react';
import UserDetailsForm from './From/UserDetailsForm';

import LeaveApplicationForm from './From/LeaveApplicationForm';
import Dashboard from './Dashboard';
import UserService from './services/userService';
import LeaveService from './services/leaveService';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userLeaves, setUserLeaves] = useState([]);

  const addUser = UserService.addUser;
  const getUserLeaves = LeaveService.getUserLeaves;
  const applyLeave = LeaveService.applyLeave;
  const getUsers = UserService.getUsers;

  useEffect(() => {
    const fetchUserLeaves = async () => {
      try {
        const leaves = await getUserLeaves();
        setUserLeaves(leaves);
      } catch (error) {
        console.error('Error fetching user leaves:', error);
      }
    };
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        console.log("uuuu",users);
        setUsers(users);
      } catch(err) {
        console.log(err)
      }
    }
    fetchUsers();
    fetchUserLeaves();
  }, []);

  const handleAddUser = async (userData) => {
    try {
      const newUser = await addUser(userData);
      setUsers([...users, newUser]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleApplyLeave = async (leaveData) => {
    try {
      const newLeave = await applyLeave(leaveData);
      setUserLeaves([...userLeaves, newLeave]);
    } catch (error) {
      console.error('Error applying leave:', error);
    }
  };

  return (
    <div>
      <h1>Leave managment Dashboard</h1>

      <h2>User Details Form</h2>
      <UserDetailsForm addUser={handleAddUser} />

      <h2>Leave Application Form</h2>
      <LeaveApplicationForm users={users} applyLeave={handleApplyLeave} />

      <h2>Dashboard</h2>
      <Dashboard userLeaves={userLeaves} />
    </div>
  );
};

export default App;
