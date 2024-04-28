import React, { useState, useEffect } from 'react';
import { setOrderQty, deleteFromOrder } from '../../components/api/api';

function OrderItem({ item, dishes, restaurants }) {

    const [restaurant, setRestaurant] = useState({})
    const [dish, setDish] = useState({})
    const [qty, setQty] = useState(1)

    useEffect(() => {
        getInfo()
        // eslint-disable-next-line
    }, [])

    const getInfo = async() => {
        let rID = "";
        dishes.forEach(d => {
            if(d._id === item.id){
                setDish(d)
                rID = d.restaurant
            }
        })
        restaurants.forEach(r => {
            if(r._id === rID){
                setRestaurant(r)
            }
        })

        setQty(item.qty)
    }

    const handlePlus = async () => {
        let temp = qty + 1
        setQty(temp)
        setOrderQty(dish._id, temp)
    }

    const handleMinus = async () => {
        if(qty === 1){
            return
        }
        let temp = qty - 1
        setQty(temp)
        setOrderQty(dish._id, temp)
    }

    const handleDelete = async () => {
        deleteFromOrder(dish._id)
        window.location.reload()
    }

    return (
        <div className="order-card">
           <h4>{dish.name}</h4>
           <h5>{restaurant.name}</h5>
           <h5>${dish.price} each</h5>
           <h5>Qty: {qty}</h5>
           <h5>Total: ${(Number(dish.price) * qty).toFixed(2) }</h5>
           <div>
                <button className='order-card-btn click-btn' onClick={handlePlus}>+</button>
                <button className={qty === 1 ? 'order-card-btn click-btn btn-inactive' : 'order-card-btn click-btn'} onClick={handleMinus}>-</button>
                <button className='order-card-btn click-btn' onClick={handleDelete}>Delete</button>
           </div>
        </div>
    );
}

export default OrderItem;
