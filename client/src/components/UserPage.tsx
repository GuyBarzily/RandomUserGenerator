import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate in v6
import { User } from '../interfaces/User';
import { getUserById } from '../services/UserService';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome styles
import '../Styles/UserPage.css'; // Adjust the path to where your CSS file is located


const UserPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        if (!id) {
            setError('User ID not found.');
            return;
        }

        setError(null);

        getUserById(id)
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id]);

    if (!user && !error) return <div>Loading...</div>;

    return (
        <div className="UserPage">
            {error ? (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <>
                    <div className="back-button-container">
                        <button
                            className="back-button"
                            onClick={() => navigate(-1)} // Use navigate(-1) to go back
                        >
                            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
                        </button>
                    </div>

                    <div className="user-details">
                        <h1>{user?.firstName} {user?.lastName}</h1>
                        <img src={user?.profilePicture} alt={`${user?.firstName} ${user?.lastName}`} />
                        <p>Email: {user?.email}</p>
                        <p>Phone: {user?.phone}</p>
                        <p>Address: {user?.address}</p>
                        <p>Date of Birth: {user?.dateOfBirth}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserPage;
