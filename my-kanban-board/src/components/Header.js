// src/components/Header.js
import React, { useState } from 'react';
import '../styles/Header.css';
import displayIcon from '../assets/Display.svg';
import downIcon from '../assets/down.svg';

function Header({ setGrouping, setOrdering }) {
    const [displayOptionsVisible, setDisplayOptionsVisible] = useState(false);

    const toggleDisplayOptions = () => {
        setDisplayOptionsVisible(!displayOptionsVisible);
    };

    return (
        React.createElement(
            'header',
            { className: 'header' },
            React.createElement(
                'div',
                { className: 'dropdown-container' },  // Added a container around the button and dropdown
                React.createElement(
                    'button',
                    { className: 'display-button', onClick: toggleDisplayOptions },
                    React.createElement('img', { src: displayIcon, alt: 'Display Icon', className: 'display-icon' }),
                    ' Display',
                    React.createElement('img', { src: downIcon, alt: 'Dropdown Icon', className: 'dropdown-icon' })
                ),
                displayOptionsVisible && React.createElement(
                    'div',
                    { className: 'dropdown-content' },
                    React.createElement(
                        'div',
                        { className: 'dropdown-row' },
                        React.createElement('label', {}, 'Grouping:'),
                        React.createElement(
                            'select',
                            { onChange: (e) => setGrouping(e.target.value) },
                            React.createElement('option', { value: 'status' }, 'Status'),
                            React.createElement('option', { value: 'user' }, 'User'),
                            React.createElement('option', { value: 'priority' }, 'Priority')
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'dropdown-row' },
                        React.createElement('label', {}, 'Ordering:'),
                        React.createElement(
                            'select',
                            { onChange: (e) => setOrdering(e.target.value) },
                            React.createElement('option', { value: 'priority' }, 'Priority'),
                            React.createElement('option', { value: 'title' }, 'Title')
                        )
                    )
                )
            )
        )
    );
}

export default Header;
