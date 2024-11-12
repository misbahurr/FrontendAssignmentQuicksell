// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import './styles/App.css';

function App() {
    // Retrieve initial state from localStorage if available
    const initialGrouping = localStorage.getItem('grouping') || 'status';
    const initialOrdering = localStorage.getItem('ordering') || 'priority';

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [grouping, setGrouping] = useState(initialGrouping);
    const [ordering, setOrdering] = useState(initialOrdering);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                const data = await response.json();

                if (data && Array.isArray(data.tickets) && Array.isArray(data.users)) {
                    setTickets(data.tickets);
                    setUsers(data.users);
                } else {
                    console.error("Unexpected API structure");
                }
            } catch (error) {
                console.error('Error fetching tickets:', error);
                setTickets([]);
                setUsers([]);
            }
        };

        fetchTickets();
    }, []);

    // Save grouping and ordering to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('grouping', grouping);
    }, [grouping]);

    useEffect(() => {
        localStorage.setItem('ordering', ordering);
    }, [ordering]);

    return React.createElement(
        'div',
        { className: 'app' },
        React.createElement(Header, { setGrouping, setOrdering }),
        React.createElement(TaskBoard, { tickets, grouping, ordering, users })
    );
}

export default App;
