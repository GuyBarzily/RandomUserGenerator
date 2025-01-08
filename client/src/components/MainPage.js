import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserCard from './UserCard'; // Import the UserCard component

function MainPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the .NET server
        fetch('http://localhost:5199/api/Users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="UsersPage">
            <h1>Users List</h1>
            <div className="user-cards-container">
                {users.map((user, index) => (
                    <Link
                        key={index}
                        to={`/user/${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`}
                    >
                        <UserCard
                            firstName={user.firstName}
                            lastName={user.lastName}
                            profilePicture={user.profilePicture}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default MainPage;
