import React from 'react';
import '../Styles/UserCard.css'; // We'll add some styling here

function UserCard({ firstName, lastName, profilePicture }) {
    return (
        <div className="user-card">
            <img className="user-card__image" src={profilePicture} alt={`${firstName} ${lastName}`} />
            <div className="user-card__info">
                <h3 className="user-card__name">{firstName} {lastName}</h3>
            </div>
        </div>
    );
}

export default UserCard;
