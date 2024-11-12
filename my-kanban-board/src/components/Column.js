// src/components/Column.js
import React from 'react';
import Card from './Card';
import '../styles/Column.css';

function Column({ title, tasks, users }) {
    return (
        <div className="column">
            <div className="cards-container">
                {tasks.map((task) => (
                    <Card key={task.id} {...task} users={users} />
                ))}
            </div>
        </div>
    );
}

export default Column;
