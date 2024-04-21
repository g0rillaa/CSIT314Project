import React, { useState } from 'react';
import { saveToken } from '../../../components/auth.js';
import { useNotification } from '../../../components/notification/NotificationContext.js';
import { login } from '../../../components/api/api.js';

function LoginForm() {
    const displayNotification = useNotification();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await login(username, password)

            if(response.data.error) {
                console.log(`Error: ${response.data.errorMsg}`);
                displayNotification('error', `${response.data.errorMsg}`);
            } else {
                saveToken(response.data.token);
                displayNotification('success', `Logged in as ${username}`);
                document.getElementById("login-button").innerHTML = `${username}`
                setTimeout(() => {
                    window.location.reload()
                },3000)
            }
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };

    const directToRegister = () => {
        window.location.href = '/register'
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="loginInput"
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="loginInput"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button type="reset" onClick={ directToRegister } className='loginButton'>Register</button>
                <button type="submit" className='loginButton'>Log In</button>
            </div>
        </form>
    );
}

export default LoginForm;
