import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
    const { username } = useParams();  // Access the username from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details based on the username from the URL
        fetch(`http://localhost:5199/api/Users/${username}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user details:', error));
    }, [username]);  // Re-fetch if the username changes

    if (!user) return <div>Loading...</div>;

    return (
        <div className="UserPage">
            <h1>{user.firstName} {user.lastName}</h1>
            <img src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
        </div>
    );
}

export default UserPage;
