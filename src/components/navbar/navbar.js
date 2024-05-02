import React, { useState, useEffect } from 'react';
import { getToken } from '../auth.js';
import { Link } from 'react-router-dom';
import { getAccount } from '../api/api.js';

import './navbar.css'

function Navbar() {
    const [username, setUsername] = useState('');
    const [accType, setAccType] = useState('customer');

    useEffect(() => {
        const token = getToken();
        if(token) {
            fetchUsername(token);
        }
    }, []);

    const fetchUsername = async () => {
        const response = await getAccount()
        setAccType(response.data.acc_type)
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

    const handleMyOrderClick = () => {
        if(username === ''){
            window.location.href = '/CSIT314Project/#/login';
			return;
        } else {
            window.location.href = '/CSIT314Project/#/myorder';
			return;
        }
    }

    const handleDashboardClick = () => {
        if(username === ''){
            window.location.href = '/CSIT314Project/#/login';
			return;
        } else {
            window.location.href = '/CSIT314Project/#/dashboard';
			return;
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-link">Home</Link>
                <div>
                    { accType === 'customer' ? (
                        <button onClick={handleMyOrderClick} className="login-button" style={{ marginRight: '10px'}}>My Order</button>
                    ) : (
                        <button onClick={handleDashboardClick} className="login-button" style={{ marginRight: '10px'}}>Dashboard</button>
                    )}
                    
                    <button onClick={handleUsernameClick} className="login-button">{username || 'Login'}</button>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
