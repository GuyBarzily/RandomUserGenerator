import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../interfaces/User'; // Import the User interface
import { getUserByUsername } from '../services/UserService'; // Import the service function

const UserPage: React.FC = () => {
    const { username } = useParams<{ username: string }>(); // Typing the 'username' parameter
    const [user, setUser] = useState<User | null>(null); // State to hold the user object or null
    const [error, setError] = useState<string | null>(null); // State to handle errors

    useEffect(() => {
        if (!username) {
            setError('Username not found.');
            return;
        }

        // Reset error state when the username changes
        setError(null);

        // Fetch user details based on the username from the URL
        getUserByUsername(username)
            .then((data) => {
                setUser(data); // Set the user data on success
            })
            .catch((err) => {
                setError(err.message); // Set the error message on failure
            });
    }, [username]);  // Re-fetch if the username changes

    if (!user && !error) return <div>Loading...</div>; // Handle loading state

    return (
        <div className="UserPage">
            {error ? (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    <h1>{user?.firstName} {user?.lastName}</h1>
                    <img src={user?.profilePicture} alt={`${user?.firstName} ${user?.lastName}`} />
                    <p>Email: {user?.email}</p>
                    <p>Phone: {user?.phone}</p>
                    <p>Address: {user?.address}</p>
                    <p>Date of Birth: {user?.dateOfBirth}</p>
                </>
            )}
        </div>
    );
}

export default UserPage;
