import React from 'react';
import { loggedOutRedirect } from '../../components/auth.js';

function SubscriptionPage() {
    React.useEffect(() => {
        loggedOutRedirect();
    }, []);
    
	return <div className='SubscriptionPage'>
		<h1>subscription page</h1>
	</div>;
}

export default SubscriptionPage;