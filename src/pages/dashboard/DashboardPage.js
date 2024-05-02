import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import RestaurantDashboard from './restaurantDashboard.js'


function DashboardPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='DashboardPage'>
		    <div className='window-pane'>
                <RestaurantDashboard></RestaurantDashboard>
            </div>
	    </div>
    )
    
}

export default DashboardPage;