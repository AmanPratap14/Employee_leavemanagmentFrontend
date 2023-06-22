import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace with your backend URL

const leaveService = {
  applyLeave: async (leaveData) => {
    try {
      const response = await axios.post(`${BASE_URL}/leaves`, leaveData);
      return response.data;
    } catch (error) {
      console.error('Error applying leave:', error);
      throw error;
    }
  },
  getUserLeaves: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/leaves`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user leaves:', error);
      throw error;
    }
  },
};

export default leaveService;
