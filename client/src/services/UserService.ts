import axios from 'axios'; // Import the custom axios instance
import { User } from '../interfaces/User'; // Import the User interface

const API_BASE_URL = 'http://localhost:5199/api/Users';


// Function to fetch all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Return the user data
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Rethrow error to be handled by the calling component
  }
};

export const getUserByUsername = async (username: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${username}`);
        return response.data; // Return the user data from the response
    } catch (error) {
        throw new Error('Error fetching user details');
    }
};
