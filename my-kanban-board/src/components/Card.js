// src/components/Card.js
import React from 'react';
import '../styles/Card.css';

// Import priority icons
import HighPriorityIcon from '../assets/Img - High Priority.svg';
import MediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import LowPriorityIcon from '../assets/Img - Low Priority.svg';
import UrgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import NoPriorityIcon from '../assets/No-priority.svg';

function Card({ id, title, priority, userId, users }) {
    // Find user by `userId` and get their name
    const user = users.find((u) => u.id === userId);
    const userName = user ? user.name : 'Unassigned';

    return (
        <div className={`card ${getPriorityClass(priority)}`}>
            {/* Display CAM label at the top */}
            <p className="card-id">{id}</p>
            <h3 className="card-title">{title}</h3>
            <p className="card-details">{userName}</p>
            <p className="card-priority">
                <img src={getPriorityIcon(priority)} alt="Priority Icon" className="priority-icon" />
                <span className="feature-request-tag">   • Feature Request</span>
            </p>
        </div>
    );
}

function getPriorityClass(priority) {
    switch (priority) {
        case 4:
            return 'card-urgent';
        case 3:
            return 'card-high';
        case 2:
            return 'card-medium';
        case 1:
            return 'card-low';
        default:
            return 'card-no-priority';
    }
}

function getPriorityIcon(priority) {
    switch (priority) {
        case 4: return UrgentIcon;
        case 3: return HighPriorityIcon;
        case 2: return MediumPriorityIcon;
        case 1: return LowPriorityIcon;
        default: return NoPriorityIcon;
    }
}

export default Card;
