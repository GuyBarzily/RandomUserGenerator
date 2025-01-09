import React from 'react';
import '../Styles/UserCard.css'; // Make sure you have styles in this file
import { User } from '../interfaces/User'; // Import the User interface

// Define the props type using the User interface
interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="user-card">
      <img
        className="user-card__image"
        src={user.profilePicture}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <div className="user-card__info">
        <h3 className="user-card__name">{user.firstName} {user.lastName}</h3>
      </div>
    </div>
  );
}

export default UserCard;
