import React from 'react';
import { Card } from 'react-bootstrap';

import './card.css'

function RestaurantCard({ restaurant }) {
    // Function to handle click on the card
    const handleClick = () => {
        window.location.href = `/CSIT314Project/#/restaurant?id=${restaurant._id}`;
    };

    return (
        <Card className="restaurant-card" onClick={handleClick} style={{ cursor: 'pointer', marginBottom: '8px' }}>
            <Card.Img variant="top" src={`${restaurant.img_url}`}/>
            <Card.Body>
                <Card.Title className='card-title'>{restaurant.name}</Card.Title>
                <Card.Text style={{marginBottom: '2px'}} className='card-txt'>
                    Location: {restaurant.location}
                </Card.Text>
                <Card.Text className='card-txt'>
                    Category: {restaurant.category}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RestaurantCard;
