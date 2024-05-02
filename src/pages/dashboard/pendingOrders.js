import React, { useState, useEffect } from 'react';
import { getPendingOrders, getAllDishes } from '../../components/api/api.js';
import PendingOrderItem from './pendingOrderItem.js';

function PendingOrders({rid}) {
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
        let filteredDishes = []
        let ctr = 0
        allDishes.forEach(async d => {
            if(d.restaurant === rid){
                filteredDishes.push(d)
            }
            ctr++
            if(ctr === allDishes.length){
                await fetchPendingOrders(filteredDishes);
                setInterval(async () => {
                    await fetchPendingOrders(filteredDishes);
                }, 3000)
            }
        })
        
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



    return (
        <div style={{padding: '2px'}}>
            { orders.length === 0 ? (
                <p style={{marginTop: "20px"}}>Your order is currently empty, visit the home page to add items.</p>
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
                            <h5>Total: ${}</h5>
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
