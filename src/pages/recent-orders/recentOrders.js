import React, { useState, useEffect } from 'react';
import { getUserOrders, getAllDishes, getAllRestaurants } from '../../components/api/api.js';
import PendingOrderItem from '../dashboard/pendingOrderItem.js';
import { formatDistanceToNow } from 'date-fns';

function RecentOrders() {
    const [allRestaurants, setAllRestaurants] = useState([])
    const [allDishes, setAllDishes] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchInfo();
        // eslint-disable-next-line
    }, []);

    const fetchInfo = async () => {
        const response1 = await getAllDishes()
        const response2 = await getAllRestaurants()
        if(response1.data.error){return}
        if(response2.data.error){return}
        setAllDishes(response1.data)
        setAllRestaurants(response2.data)

        fetchOrders()
    }

    const fetchOrders = async () => {
        const response = await getUserOrders()
        if(response.data.error){
            return
        }
        const sortedOrders = response.data.sort((a, b) => b.creation_date - a.creation_date);

        setOrders(sortedOrders)
    };

    const calcTotal = (orderArray, sub) => {
        let sum = 0
        orderArray.forEach(order => {
            allDishes.forEach(dish => {
                if(dish._id === order.id){
                    sum += (dish.price * order.qty)
                }
            })
        })
        if(sub){
            sum = sum - (sum*0.15)
        }
        return sum
    }

    const getRestaurantName = (id) => {
        let name = ''
        allRestaurants.forEach(r => {
            if(r._id === id){
                name = r.name
            }
        })
        return name
    }

    const getStatusTxt = (txt) => {
        if(txt === 'pending'){
            return 'Pending'
        }
        if(txt === 'preparing'){
            return 'Preparing'
        }
        if(txt === 'cancelled'){
            return 'Cancelled'
        }
        if(txt === 'completed'){
            return 'Completed'
        }
        return txt
    }



    return (
        <div style={{padding: '10px'}}>
            <h1>Recent Orders</h1>
            <div>
                {orders.length > 0 ? (
                    orders.map((item, index) => (
                        <div key={index} className='pending-order-card'>
                            <h5>{getRestaurantName(item.restaurant)}</h5>
                            {item.order.map((item, index) => (
                                <div key={index} className='order-item'>
                                    <PendingOrderItem item={item} dishes={allDishes}></PendingOrderItem>
                                </div>
                            ))}
                            { item.subscription ? (
                                    <h6>Total: ${calcTotal(item.order, true).toFixed(2)}(15% discount)</h6>
                                ) : (
                                    <h5>Total: ${calcTotal(item.order, false).toFixed(2)}</h5>
                            )}
                            <h5>Status: {getStatusTxt(item.status)}</h5>
                            <h6>{formatDistanceToNow(new Date(item.creation_date), { addSuffix: true })}</h6>
                        </div>
                        
                    ))
                ) : (
                    <p>You have no recent orders</p>
                )}
            </div>
        </div>
        
    );
}

export default RecentOrders;
