import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import RecentOrders from './recentOrders.js';


function RecentOrdersPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return (
        <div className='RecentOrdersPage'>
		    <div className='window-pane'>
                <RecentOrders></RecentOrders>
            </div>
	    </div>
    )
    
}

export default RecentOrdersPage;