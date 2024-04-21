import React from 'react';
import { loggedOutRedirect } from '../../../components/auth.js';

import './accountpage.css'

function AccountOrdersPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='AccountPage'>
		    <h1>orders</h1>
	    </div>
    )
    
}

export default AccountOrdersPage;