import React from 'react';
import Register from './components/register.js'
import { loggedInRedirect } from '../../components/auth.js';

import './register.css'


function RegisterPage() {
    React.useEffect(() => {
        loggedInRedirect();
    }, []);
    
	return (
		<div className='RegisterPage'>
		    <div className='registerPane'>
                <div className='registerForm'>
                    <h1>Register</h1>
                    <Register></Register>
                </div>
                <div className='registerImage'></div>
            </div>
	    </div>
	)
}

export default RegisterPage;