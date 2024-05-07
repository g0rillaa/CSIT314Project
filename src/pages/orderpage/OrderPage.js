import React, { useEffect, useState } from 'react';
import { getOrderStatus, getAllDishes } from '../../components/api/api.js';
import { useNotification } from '../../components/notification/NotificationContext.js';
import PendingOrderItem from '../dashboard/pendingOrderItem.js'
import './orderpage.css'
import { formatDistanceToNow } from 'date-fns';


function OrderPage() {
    const displayNotification = useNotification();
    const [notFound, setNotFound] = useState(true);
    const [order, setOrder] = useState({});
    const [allDishes, setAllDishes] = useState([])
    const [status, setStatus] = useState('pending')

    

    useEffect(() => {

        function getOrderRefFromURL() {
            const search = window.location.hash.split('?')[1];
            const params = new URLSearchParams(search);
            return params.get('id');
        }

        const fetchDishes = async () => {
            const response = await getAllDishes()
            setAllDishes(response.data)
            await fetchOrder()
            setInterval(async () => {
                await fetchOrder();
            }, 3000)
        }

        const fetchOrder = async () => {
            const orderRef = getOrderRefFromURL()
            const response = await getOrderStatus(orderRef)
            if(!response.data.error){
                setOrder(response.data)
                console.log(status, response.data.status)
                if(status !== response.data.status){
                    setStatus(response.data.status)
                    var type = 'success'
                    if(response.data.status === 'cancelled'){
                        type = 'error'
                    }
                    displayNotification(type, `Order status updated to ${getStatusTxt(response.data.status)}`)
                }
                
                setNotFound(false)
            }
            
        }

        fetchDishes()
        
        // eslint-disable-next-line
    }, [])

    const calcTotal = (orderArray) => {
        let sum = 0
        orderArray.forEach(order => {
            allDishes.forEach(dish => {
                if(dish._id === order.id){
                    sum += (dish.price * order.qty)
                }
            })
        })
        if(order.subscription){
            sum = sum - (sum * 0.15)
        }
        return sum
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
		<div className='OrderPage'>
            <div className='window-pane'>
                <div className='o-page'>
                    {notFound ? (
                        <h1 style={{padding: '10px'}}>Order reference not found</h1>
                    ):(
                        <div>
                            <div className='pending-order-card' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}>
                                <h5>Status: {getStatusTxt(order.status)}</h5>
                                {order.order.map((item, index) => (
                                    <div key={index} className='order-item'>
                                        <PendingOrderItem item={item} dishes={allDishes}></PendingOrderItem>
                                    </div>
                                ))}
                                { order.subscription ? (
                                    <h6>Total: ${calcTotal(order.order).toFixed(2)}(15% discount)</h6>
                                ) : (
                                    <h5>Total: ${calcTotal(order.order).toFixed(2)}</h5>
                                )}
                                
                                <h6>{formatDistanceToNow(new Date(order.creation_date), { addSuffix: true })}</h6>
                                
                            </div>
                            <h3 style={{padding: '20px'}}>This page will automatically update the status of the order</h3>
                        </div>
                        
                        
                    )} 
                    
                </div>
            </div>
	    </div>
	)
}

export default OrderPage;