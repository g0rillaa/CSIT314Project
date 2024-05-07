import React, { useState, useEffect } from 'react';
import { getPendingOrders, getAllDishes } from '../../components/api/api.js';
import PendingOrderItem from './pendingOrderItem.js';
import { formatDistanceToNow } from 'date-fns';

function PendingOrders() {
    const [orders, setOrders] = useState([])
    const [allDishes, setAllDishes] = useState([])


    useEffect(() => {
        fetchDishes()
        // eslint-disable-next-line
    }, []);



    const fetchDishes = async () => {
        const response = await getAllDishes();
		const allDishes = response.data
        setAllDishes(allDishes)
        await fetchPendingOrders(allDishes);
        setInterval(async () => {
            await fetchPendingOrders(allDishes);
        }, 3000)
        
    }


    const fetchPendingOrders = async (filteredDishes) => {
        let tempOrders = []
        const fetchedOrders = await getPendingOrders()
        fetchedOrders.data.forEach(o => {
            filteredDishes.forEach(d => {
                if(o.order[0].id === d._id){
                    tempOrders.push(o)
                }
            })
        })
        setOrders(tempOrders)
    };

    const calcTotal = (orderArray) => {
        let sum = 0
        orderArray.forEach(order => {
            allDishes.forEach(dish => {
                if(dish._id === order.id){
                    sum += (dish.price * order.qty)
                }
            })
        })
        return sum
    }



    return (
        <div style={{padding: '2px'}}>
            { orders.length === 0 ? (
                <p style={{marginTop: "20px"}}>You have no pending orders.</p>
            ) : (
                <div>
                    {orders.map((item, index) => (
                        <div key={index} className='pending-order-card'>
                            <h5>{item.ref}</h5>
                            {item.order.map((item, index) => (
                                <div key={index} className='order-item'>
                                    <PendingOrderItem item={item} dishes={allDishes}></PendingOrderItem>
                                </div>
                            ))}
                            <h5>Total: ${calcTotal(item.order)}</h5>
                            <h6>{formatDistanceToNow(new Date(item.creation_date), { addSuffix: true })}</h6>
                            <div style={{display: 'flex'}}>
                                <button className='click-btn pending-order-btn-a'>Accept</button>
                                <button className='click-btn pending-order-btn-d'>Decline</button>
                            </div>
                        </div>
                        
                    ))}
                    
                </div>
            )}
        </div>
        
    );
}

export default PendingOrders;
