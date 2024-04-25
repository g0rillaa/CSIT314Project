import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import ManageDishes from './ManageDishes.js';

function ManageDishesPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='ManageDishesPage'>
		    <ManageDishes></ManageDishes>
	    </div>
    )
    
}

export default ManageDishesPage;