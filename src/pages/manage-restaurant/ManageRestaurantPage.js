import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import ManageRestaurant from './components/ManageRestaurant.js';

function ManageRestaurantPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='ManageRestaurantPage'>
		    <ManageRestaurant></ManageRestaurant>
	    </div>
    )
    
}

export default ManageRestaurantPage;