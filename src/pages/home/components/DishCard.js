import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import './card.css'

function DishCard({ dish, allRestaurants }) {
    // Function to handle click on the card
    const [restaurant, setRestaurant] = useState('');

    useEffect(() => {
        getRestaurantName()
        // eslint-disable-next-line
    }, [])

    const handleClick = () => {
        window.location.href = `/CSIT314Project/#/dish?id=${dish._id}`;
    };

    const getRestaurantName = async() => {
        allRestaurants.forEach(r => {
            if(r._id === dish.restaurant){
                setRestaurant(r.name)
            }
        })
    }

    return (
        <Card className="dish-card" onClick={handleClick} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img variant="top" src={`${dish.img_url}`}/>
            <Card.Body>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Text>
                    Price: {dish.price}
                </Card.Text>
                <Card.Text>
                    Type: {dish.type}
                </Card.Text>
                <Card.Text>
                    Restaurant: {restaurant}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default DishCard;
