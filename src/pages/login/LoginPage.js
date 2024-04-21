import React from 'react';
import Login from './components/login.js'
import { loggedInRedirect } from '../../components/auth.js';

import './login.css'

function LoginPage() {
    React.useEffect(() => {
        loggedInRedirect();
    }, []);

	return (
        <div className='LoginPage'>
		    <div className='loginPane'>
                <div className='loginForm'>
                    <h1>Login</h1>
                    <Login></Login>
                </div>
                <div className='loginImage'></div>
            </div>
	    </div>
    )
}

export default LoginPage;