import React, { useEffect, useState } from 'react';
import { getAllDishes, addToOrder, getAccount } from '../../components/api/api.js';
import { useNotification } from '../../components/notification/NotificationContext.js';
import './dish.css'


function DishPage() {
    const displayNotification = useNotification();
    const [notFound, setNotFound] = useState(true);
    const [dish, setDish] = useState({ name: '', img_url: '', type: '', price: '', _id: '' });

    

    useEffect(() => {

        function getDishIdFromUrl() {
            const search = window.location.hash.split('?')[1]; // Split to get the part after '#'
            const params = new URLSearchParams(search);
            return params.get('id');
        }

        const fetchDishes = async () => {
            const dishes = await getAllDishes()
            const dishID = getDishIdFromUrl()
            dishes.data.forEach(d => {
                if(d._id === dishID){
                    setDish(d)
                    setNotFound(false);
                }
            })
        }

        fetchDishes()
        
        
    }, [])


    const handleRestaurantClick = async () => {
        window.location.href = `/CSIT314Project/#/restaurant?id=${dish.restaurant}`;
    }

    const handleAddToOrder = async () => {
        const acc = await getAccount()
        if(acc.data.acc_type === "restaurant_owner"){
            return displayNotification('error', `Sorry, this feature is only available to customer accounts`);
        } else {
            const result = await addToOrder(dish._id)
            if(result.data.error){
                displayNotification('error', `${result.data.errorMsg}`);
            }
            if(result.data.success){
                displayNotification('success', `Added to order`);
            }
        }
    }
    
	return (
		<div className='DishPage'>
            <div className='window-pane'>
                <div className='ds-page'>
                    {notFound ? (
                        <h1>Dish not found</h1>
                    ):(
                        <div>
                            <h1 className='ds-title'>{dish.name}</h1>
                            <h2 className='ds-type'>{dish.type}</h2>
                            <h2 className='ds-price'>${dish.price}</h2>
                            <img alt="img" className='ds-img' src={dish.img_url}></img>

                            <div style={{marginTop: "10px"}}>
                                <button className="ds-rs-btn" onClick={handleAddToOrder}>Add to order</button>
                            </div>

                            <div style={{marginTop: "10px"}}>
                                <button className="ds-rs-btn" onClick={handleRestaurantClick}>Go to restaurant</button>
                            </div>
                           
                        </div>
                    )} 
                    
                </div>
            </div>
	    </div>
	)
}

export default DishPage;