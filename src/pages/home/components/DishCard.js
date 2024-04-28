import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'react-bootstrap';

import './card.css'

function DishCard({ dish, allRestaurants }) {
    // Function to handle click on the card
    const [restaurant, setRestaurant] = useState('');


    const handleClick = () => {
        window.location.href = `/CSIT314Project/#/dish?id=${dish._id}`;
    };

    const getRestaurantName = useCallback(() => {
        allRestaurants.forEach(r => {
            if(r._id === dish.restaurant){
                setRestaurant(r.name)
            }
        })
    }, [allRestaurants, dish.restaurant])

    useEffect(() => {
        getRestaurantName()
    }, [getRestaurantName])

    return (
        <Card className="dish-card" onClick={handleClick} style={{ cursor: 'pointer', marginBottom: '8px' }}>
            <Card.Img variant="top" src={`${dish.img_url}`}/>
            <Card.Body>
                <Card.Title className='card-title'>{dish.name}</Card.Title>
                <Card.Text style={{marginBottom: '2px'}} className='card-txt'>
                    {restaurant}
                </Card.Text>
                <Card.Text style={{marginBottom: '2px'}} className='card-txt'>
                    Price: ${dish.price}
                </Card.Text>
                <Card.Text className='card-txt'>
                    {dish.type}
                </Card.Text>
                
            </Card.Body>
        </Card>
    );
}

export default DishCard;
