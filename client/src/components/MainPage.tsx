import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/UserService'; // Import the function from UserService
import UserCard from './UserCard'; // Import the UserCard component
import '../Styles/MainPage.css';

import { User } from '../interfaces/User'; // Import User interface

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Define the state as an array of User objects
  const [loading, setLoading] = useState<boolean>(true); // Define loading state
  const [page, setPage] = useState<number>(1); // State for page number
  const [pageSize, setPageSize] = useState<number>(10); // State for page size

  // Function to handle page changes
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(event.target.value));
  };

  // Function to handle page size changes
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
  };

  useEffect(() => {
    // Fetch users from UserService with page and pageSize
    getUsers(page, pageSize)
      .then((data: User[]) => {
        setUsers(data); // Set users on success
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error: Error) => {
        console.error('Error fetching users:', error); // Handle error
        setLoading(false); // Set loading to false on error as well
      });
  }, [page, pageSize]); // Only run when page or pageSize changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching users
  }

  return (
    <div className="UsersPage">
      <h1>Users List</h1>

      {/* Select dropdown for Page Size */}
      <div>
        <label htmlFor="page">Page: </label>
        <select id="page" value={page} onChange={handlePageChange}>
          {/* Assuming there are 5 pages for now, you can adjust based on your data */}
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>

        <label htmlFor="pageSize">Page Size: </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* Select dropdown for Page */}


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
