import React, { useState, useEffect } from 'react';
import { clearToken } from '../../../components/auth.js';
import { getAccount } from '../../../components/api/api.js';

function AccountView() {
    const [username, setUsername] = useState('');
    const [accType, setAccType] = useState('');

    useEffect(() => {
        fetchAcc();
    }, []);

    const fetchAcc = async () => {
        const response = await getAccount();
        setUsername(response.data.username);
        setAccType(response.data.acc_type)
    };


    const logout = () => {
        clearToken();
        window.location.href = '/CSIT314Project/#/login';
        window.location.reload()
    }

    const directToOrders = () => {
        window.location.href = '/CSIT314Project/#/account/orders'
    }
    const directToRestaurantManage = () => {
        window.location.href = '/CSIT314Project/#/managerestaurant'
    }

    const directToSubscription = () => {
        window.location.href = '/CSIT314Project/#/subscription'
    }

    return (
        <div className="window-pane">
            <h1 className='account-hello'>{`Hi, ${username || '...'}`}</h1>
            { accType === 'customer' ?
                <div>
                    <button className='click-btn account-recent-orders' onClick={ directToOrders }>View Recent Orders</button>
                    <button className='click-btn account-recent-orders' onClick={ directToSubscription }>Manage Subscription</button>
                </div>: ''}
            { accType === 'restaurant_owner' ?
                <div>
                    <button className='click-btn account-manage-restaurant' onClick={ directToRestaurantManage }>Manage Restaurant</button>
                </div>: ''}
            
            <div>
                <button className='click-btn' onClick={ logout }>Logout</button>
            </div>
            
            
        </div>
    );
}

export default AccountView;
