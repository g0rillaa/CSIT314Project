import React from 'react';
import { Card } from 'react-bootstrap';

function RestaurantCard({ restaurant }) {
    return (
        <Card>
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