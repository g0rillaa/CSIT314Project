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
        console.log(response)
        setUsername(response.data.username);
        setAccType(response.data.acc_type)
    };


    const logout = () => {
        clearToken();
        window.location.href = '/login';
    }

    const directToOrders = () => {
        window.location.href = '/account/orders'
    }
    const directToRestaurantManage = () => {
        window.location.href = '/managerestaurant'
    }

    return (
        <div className="window-pane">
            <h1 className='account-hello'>{`Hi, ${username || '...'}`}</h1>
            { accType === 'customer' ?
                <div>
                    <button className='click-btn account-recent-orders' onClick={ directToOrders }>View Recent Orders</button>
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
