import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import AccountView from './components/AccountView.js';

import './accountpage.css'

function AccountPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='AccountPage'>
		    <AccountView></AccountView>
	    </div>
    )
    
}

export default AccountPage;