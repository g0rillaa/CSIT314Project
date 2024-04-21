import React, { useState, useEffect } from 'react';
import { getAccount, getRestaurantFromUsername, createNewRestaurant } from '../../../components/api/api.js';
import { useNotification } from '../../../components/notification/NotificationContext.js';

import './managerestaurant.css'

function ManageRestaurant() {
    const displayNotification = useNotification();
    const [username, setUsername] = useState('')
    const [ownsRestaurant, setOwnsRestaurant] = useState(false);
    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantLocation, setRestaurantLocation] = useState('')
    //const [restaurantCategory, setRestaurantCategory] = useState('')

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        const account = await getAccount();
        setUsername(account.data.username);
        const restaurant = await getRestaurantFromUsername(account.data.username);
        if(restaurant.data.error){
            return setOwnsRestaurant(false);
        }
        setOwnsRestaurant(true);
        setRestaurantName(restaurant.data.name);
        setRestaurantLocation(restaurant.data.location);
        //setRestaurantCategory(restaurant.data.category);
    };

    const createNewRestaurantBtn = async () => {
        const result = await createNewRestaurant(username)
        if(result.data.error){
            return displayNotification('error', `${result.data.errorMsg}`);
        }
        if(result.data.success){
            window.location.reload();
        }
    }


    

    return (
        <div className="window-pane">
            <h1 className='title'>Manage Restaurant</h1>
            { ownsRestaurant ?
                <div>
                    <div>
                        <label>Name</label>
                        <input 
                            value={restaurantName} 
                            onChange={e => setRestaurantName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Location</label>
                        <input 
                            value={restaurantLocation} 
                            onChange={e => setRestaurantLocation(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <select>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
            : 
                <button className='click-btn' onClick={ createNewRestaurantBtn }>Click to create a restaurant</button>
            }
            
        </div>
    );
}

export default ManageRestaurant;
