import React from 'react';
import { Card } from 'react-bootstrap';

import './card.css'

function RestaurantCard({ restaurant }) {
    // Function to handle click on the card
    const handleClick = () => {
        window.location.href = `/CSIT314Project/#/restaurant?id=${restaurant.id}`;
    };

    return (
        <Card className="restaurant-card" onClick={handleClick} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            <Card.Img variant="top" src={`${restaurant.img_url}`}/>
            <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                    Location: {restaurant.location}
                </Card.Text>
                <Card.Text>
                    Category: {restaurant.category}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RestaurantCard;
