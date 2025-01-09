import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/UserService'; // Import the function from UserService
import UserCard from './UserCard'; // Import the UserCard component
import { User } from '../interfaces/User'; // Import User interface

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Define the state as an array of User objects
  const [loading, setLoading] = useState<boolean>(true); // Define loading state

  useEffect(() => {
    // Fetch users from UserService
    getUsers()
      .then((data: User[]) => {
        setUsers(data); // Set users on success
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error: Error) => {
        console.error('Error fetching users:', error); // Handle error
        setLoading(false); // Set loading to false on error as well
      });
  }, []); // Only run once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching users
  }

  return (
    <div className="UsersPage">
      <h1>Users List</h1>
      <div className="user-cards-container">
        {users.map((user, index) => (
          <Link
            key={index}
            to={`/user/${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`}
          >
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
