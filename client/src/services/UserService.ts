import axios from 'axios'; // Import the custom axios instance
import { User } from '../interfaces/User'; // Import the User interface

const API_BASE_URL = 'http://localhost:5199/api/Users';


// Function to fetch users with pagination
export const getUsers = async (page: number = 1, pageSize: number = 10): Promise<User[]> => {
  try {
    // Make a GET request to fetch users with page and pageSize as query parameters
    const response = await axios.get(API_BASE_URL, {
      params: {
        page,      // Pass page number
        pageSize   // Pass page size
      }
    });
    return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow error to be handled by the calling component
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?username=${username}`);
    return response.data; // Return the user data from the response
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw new Error('Error fetching user details');
  }
};

export const searchUsers = async (query: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { query }, // Send the search query as a parameter
    });
    return response.data; // Return the filtered list of users
  } catch (error) {
    console.error('Error searching for users:', error);
    throw new Error('Error searching for users');
  }
};

