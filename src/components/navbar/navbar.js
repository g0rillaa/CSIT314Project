import React, { useState, useEffect } from 'react';
import { getToken } from '../auth.js';
import { Link } from 'react-router-dom';
import { getAccount } from '../api/api.js';

import './navbar.css'

function Navbar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = getToken();
        if(token) {
            fetchUsername(token);
        }
    }, []);

    const fetchUsername = async (token) => {
        const response = await getAccount()
        setUsername(response.data.username)
    };

    const handleUsernameClick = () => {
        if(username === ''){
            window.location.href = '/CSIT314Project/#/login';
			return;
        } else {
            window.location.href = '/CSIT314Project/#/account';
			return;
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                <button onClick={handleUsernameClick} className="login-button">
                    {username || 'Login'}
                </button>
            </div>
        </nav>

    );
}

export default Navbar;
