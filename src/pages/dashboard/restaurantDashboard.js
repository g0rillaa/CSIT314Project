import React, { useState, useEffect } from 'react';
import { getAccount, getRestaurantFromUsername } from '../../components/api/api.js';
import PendingOrders from './pendingOrders.js';

import './restaurantDashboard.css'

function RestaurantDashboard() {
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantID, setRestaurantID] = useState('')

    useEffect(() => {
        fetchRestaurant();
    }, []);


    const fetchRestaurant = async () => {
        const account = await getAccount();
        const restaurant = await getRestaurantFromUsername(account.data.username);

        setRestaurantName(restaurant.data.name);
        setRestaurantID(restaurant.data._id)
    };



    return (
        <div style={{padding: '10px'}}>
            <h1>{restaurantName}</h1>
            <div>
                <h5>Pending Orders</h5>
                {restaurantID ? (
                    <PendingOrders></PendingOrders>
                ) : (
                    <p>Loading pending orders...</p>
                )}
            </div>
        </div>
        
    );
}

export default RestaurantDashboard;
