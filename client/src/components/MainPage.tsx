import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/UserService'; // Import the function for fetching users
import { searchUsers } from '../services/UserService'; // Import the function for searching users
import UserCard from './UserCard'; // Import the UserCard component
import '../Styles/MainPage.css';
import { User } from '../interfaces/User'; // Import User interface

const MainPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Define the state as an array of User objects
  const [loading, setLoading] = useState<boolean>(true); // Define loading state
  const [page, setPage] = useState<number>(1); // State for page number
  const [pageSize, setPageSize] = useState<number>(10); // State for page size
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  // Function to handle page changes
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(event.target.value));
  };

  // Function to handle page size changes
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
  };

  // Function to handle search query changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      if (searchQuery) {
        // Search users if search query is present
        try {
          const filteredUsers = await searchUsers(searchQuery);
          setUsers(filteredUsers); // Set filtered users from search
          setLoading(false); // Set loading to false once data is fetched
        } catch (error) {
          console.error('Error fetching users by query:', error);
        }
      } else {
        // Fetch users with pagination if no search query
        getUsers(page, pageSize)
          .then((data: User[]) => {
            setUsers(data); // Set users on success
            setLoading(false); // Set loading to false once data is fetched
          })
          .catch((error: Error) => {
            console.error('Error fetching users:', error); // Handle error
            setLoading(false); // Set loading to false on error as well
          });
      }
    };

    fetchUsers();
  }, [page, pageSize, searchQuery]); // Only run when page, pageSize, or searchQuery changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching users
  }

  return (
    <div className="UsersPage">
      <h1>Users List</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Select dropdown for Page Size */}
      <div className="select-container">
        <label htmlFor="page">Page: </label>
        <select id="page" value={page} onChange={handlePageChange}>
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

      {/* User cards */}
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
};

export default MainPage;
