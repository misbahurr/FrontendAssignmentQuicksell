// src/components/TaskBoard.js
import React, { useEffect, useState } from 'react';
import Column from './Column';
import '../styles/TaskBoard.css';

// Import icons
import TodoIcon from '../assets/To-do.svg';
import InProgressIcon from '../assets/in-progress.svg';
import DoneIcon from '../assets/Done.svg';
import CancelledIcon from '../assets/Cancelled.svg';
import BacklogIcon from '../assets/Backlog.svg';
import PlusIcon from '../assets/add.svg';
import ThreeDotMenuIcon from '../assets/3 dot menu.svg';
import HighPriorityIcon from '../assets/Img - High Priority.svg';
import MediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import LowPriorityIcon from '../assets/Img - Low Priority.svg';
import UrgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import NoPriorityIcon from '../assets/No-priority.svg';

function TaskBoard({ grouping, ordering }) {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then(response => response.json())
            .then(data => {
                setTickets(data.tickets || []);
                setUsers(data.users || []);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const groupTickets = () => {
        const grouped = {
            'status': { Backlog: [], Todo: [], 'In Progress': [], Done: [], Cancelled: [] },
            'priority': { 4: [], 3: [], 2: [], 1: [], 0: [] },
            'user': users.reduce((acc, user) => ({ ...acc, [user.name]: [] }), { Unassigned: [] })
        }[grouping];

        tickets.forEach(ticket => {
            const groupKey = grouping === 'status' ? ticket.status :
                             grouping === 'priority' ? ticket.priority :
                             users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
            if (groupKey in grouped) grouped[groupKey].push(ticket);
        });

        return grouped;
    };

    const sortTickets = (tickets) => {
        if (ordering === 'priority') {
            return tickets.slice().sort((a, b) => b.priority - a.priority);
        }
        if (ordering === 'title') {
            return tickets.slice().sort((a, b) => a.title.localeCompare(b.title));
        }
        return tickets;
    };

    const groupedTickets = groupTickets();

    // Define icons and labels for priorities
    const getStatusIcon = (status) => ({
        'Todo': TodoIcon,
        'In Progress': InProgressIcon,
        'Done': DoneIcon,
        'Cancelled': CancelledIcon,
        'Backlog': BacklogIcon
    }[status]);

    const getPriorityIcon = (priority) => ({
        4: UrgentIcon,
        3: HighPriorityIcon,
        2: MediumPriorityIcon,
        1: LowPriorityIcon,
        0: NoPriorityIcon
    }[priority]);

    const getPriorityText = (priority) => ({
        4: 'Urgent',
        3: 'High',
        2: 'Medium',
        1: 'Low',
        0: 'No Priority'
    }[priority]);

    // Adjust order for priority and user grouping
    const priorityOrder = [4, 3, 2, 1, 0];
    const userOrder = (a, b) => {
        if (a === 'Unassigned') return 1;
        if (b === 'Unassigned') return -1;
        return a.localeCompare(b);
    };

    return (
        <div className="task-board">
            {Object.entries(groupedTickets)
                .sort(([a], [b]) => {
                    if (grouping === 'priority') return priorityOrder.indexOf(Number(a)) - priorityOrder.indexOf(Number(b));
                    if (grouping === 'user') return userOrder(a, b);
                    return 0;
                })
                .map(([group, groupTickets]) => (
                    <div key={group} className="column">
                        <div className="column-header">
                            <div className="column-title">
                                {grouping === 'status' && getStatusIcon(group) && (
                                    <img src={getStatusIcon(group)} alt={`${group} Icon`} className="column-icon" />
                                )}
                                {grouping === 'priority' && getPriorityIcon(parseInt(group)) && (
                                    <img src={getPriorityIcon(parseInt(group))} alt={`${group} Priority Icon`} className="column-icon" />
                                )}
                                <span>
                                    {grouping === 'priority'
                                        ? `${getPriorityText(parseInt(group))} (${groupTickets.length})`
                                        : `${group} (${groupTickets.length})`}
                                </span>
                            </div>
                            <div className="column-actions">
                                <img src={PlusIcon} alt="Add" className="action-icon" />
                                <img src={ThreeDotMenuIcon} alt="Menu" className="action-icon" />
                            </div>
                        </div>
                        <Column title="" tasks={sortTickets(groupTickets)} users={users} />
                    </div>
                ))}
        </div>
    );
}

export default TaskBoard;
