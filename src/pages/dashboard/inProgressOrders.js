import React, { useState, useEffect } from 'react';
import { getPreparingOrders, getAllDishes, setOrderStatus } from '../../components/api/api.js';
import PendingOrderItem from './pendingOrderItem.js';
import { formatDistanceToNow } from 'date-fns';

function InProgressOrders({rid}) {
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
        await fetchPreparingOrders(allDishes);
        setInterval(async () => {
            await fetchPreparingOrders(allDishes);
        }, 3000)
        
    }


    const fetchPreparingOrders = async (dishes) => {
        let tempOrders = []
        const fetchedOrders = await getPreparingOrders()
        fetchedOrders.data.forEach(o => {
            if(o.restaurant === rid){
                tempOrders.push(o)
            }
        })
        setOrders(tempOrders)
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
            sum = sum - (sum * 0.15)
        }
        return sum
    }

    const completeOrderBtn = (item) => {
        setOrderStatus(item.ref, 'completed')
    }

    const cancelOrderBtn = (item) => {
        setOrderStatus(item.ref, 'cancelled')
    }



    return (
        <div style={{padding: '2px'}}>
            { orders.length === 0 ? (
                <p style={{marginTop: "20px"}}>You have no in-progress orders.</p>
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
                            { item.subscription ? (
                                <h6>Total: ${calcTotal(item.order, true).toFixed(2)}(15% discount)</h6>
                            ) : (
                                <h5>Total: ${calcTotal(item.order, false).toFixed(2)}</h5>
                            )}
                            <h6>{formatDistanceToNow(new Date(item.creation_date), { addSuffix: true })}</h6>
                            <div style={{display: 'flex'}}>
                                <button className='click-btn pending-order-btn-a' onClick={ () => completeOrderBtn(item) }>Complete</button>
                                <button className='click-btn pending-order-btn-d' onClick={ () =>  cancelOrderBtn(item) }>Cancel</button>
                            </div>
                        </div>
                        
                    ))}
                    
                </div>
            )}
        </div>
        
    );
}

export default InProgressOrders;
