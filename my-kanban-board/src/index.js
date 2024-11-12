// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';

ReactDOM.render(
    React.createElement(React.StrictMode, {}, React.createElement(App)),
    document.getElementById('root')
);
