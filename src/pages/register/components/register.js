import React, { useState } from 'react';
import { saveToken } from '../../../components/auth.js';
import { useNotification } from '../../../components/notification/NotificationContext.js';
import { register } from '../../../components/api/api.js';

function RegisterForm() {
    const displayNotification = useNotification();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accType, setAccType] = useState('customer')

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        try {
            const response = await register(username, password, accType)
            if(response.data.error){
                console.log(`Error: ${response.data.errorMsg}`);
                displayNotification('error', `${response.data.errorMsg}`);
            } else {
                saveToken(response.data.token);
                displayNotification('success', `Created account ${username}`);
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (error) {
            console.error('Error making the request:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    className="registerInput"
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    className="registerInput"
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <select
                    className='registerDropdown'
                    name="acctype"
                    id="acctype"
                    value={accType}
                    onChange={(e) => setAccType(e.target.value)}
                >
                    <option value="customer">Customer</option>
                    <option value="restaurant_owner">Restaurant Owner</option>
                </select>
            </div>
            <div>
                <button type="submit" className='registerButton'>Register</button>
            </div>
        </form>
    );
}

export default RegisterForm;
