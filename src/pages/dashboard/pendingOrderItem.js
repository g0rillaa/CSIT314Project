import React, { useState, useEffect } from 'react';

function PendingOrderItem({ item, dishes }) {
    const [dish, setDish] = useState({})
    const [qty, setQty] = useState(1)

    useEffect(() => {
        getInfo()
        // eslint-disable-next-line
    }, [])

    const getInfo = async() => {
        dishes.forEach(d => {
            if(d._id === item.id){
                setDish(d)
            }
        })

        setQty(item.qty)
    }

    return (
        <div className="pending-order-card-item">
           <h4>{dish.name}</h4>
           <h5>${dish.price} each</h5>
           <h5>Qty: {qty}</h5>
        </div>
    );
}

export default PendingOrderItem;
