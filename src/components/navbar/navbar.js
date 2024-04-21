import React, { useState, useEffect } from 'react';
import { getToken } from '../auth.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        try {
            const response = await axios.get('http://localhost:3140//api/getaccount', {headers: { token: `${token}` }});
            if(response.data.error){
                return console.log(`Error: ${response.data.errorMsg}`)
            } else {
                setUsername(response.data.username)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUsernameClick = () => {
        if(username === ''){
            window.location.href = '/CSIT314Project/login';
			return;
        } else {
            window.location.href = '/CSIT314Project/account';
			return;
        }
    }

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/CSIT314Project/" className="nav-link">Home</Link>
                <Link to="/CSIT314Project/subscription" className="nav-link">Subscription</Link>
            </div>
            <div className="nav-button">
                <button onClick={handleUsernameClick} className="login-button" id="login-button">
                    {username || 'Login'}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
