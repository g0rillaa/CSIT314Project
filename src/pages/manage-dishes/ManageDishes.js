import React, { useState, useEffect } from 'react';
import { getAccount, getRestaurantFromUsername, addDish, getDishesFromRestaurantID, updateDish, deleteDish } from '../../components/api/api.js';
import { useNotification } from '../../components/notification/NotificationContext.js';
import { Button, Container, Form, Card, Row, Col } from 'react-bootstrap';

import './ManageDishes.css'

function ManageDishes() {
    const displayNotification = useNotification();
    //const [restaurantID, setRestaurantID] = useState({})
    const [dishes, setDishes] = useState([]);


    useEffect(() => {
        fetchRestaurant();
        // eslint-disable-next-line
    }, []);

    const fetchRestaurant = async () => {
        const account = await getAccount();
        const restaurant = await getRestaurantFromUsername(account.data.username);
        if(restaurant.data.error){
            return window.location.href = '/CSIT314/#/account'
        }

        //setRestaurantID(restaurant.data._id)
        fetchDishes(restaurant.data._id)
    };

    const fetchDishes = async (id) => {
        const result = await getDishesFromRestaurantID(id)
        console.log(id)
        console.log(result)
        setDishes(result.data)
    }


    const addDishBtn = async () => {
        const result = await addDish()
        if(result.data.error){
            displayNotification('error', `${result.data.errorMsg}`);
            return;
        }
        if(result.data.success){
            window.location.reload();
        }
    }



    const handleDishUpdate = async (id, name, type, price, img_url) => {
        const result = await updateDish(id, name, type, price, img_url);
        if(result.data.error){
            displayNotification('error', `${result.data.errorMsg}`);
            return;
        }
        if(result.data.success){
            window.location.reload();
            
        }
    }

    const handleDishDelete = async (id) => {
        console.log(id)
        const result = await deleteDish(id);
        if(result.data.error){
            displayNotification('error', `${result.data.errorMsg}`);
            return;
        }
        if(result.data.success){
            window.location.reload();
        }
    }

    return (
        <div className='window-pane'>
            <Container className="my-4">
                <h1 className='title'>Manage Dishes</h1>
                {dishes.map((dish, index) => (
                    <Card className="mb-3">
                        <Card.Body>
                            <Form key={index}>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column xs={4} sm={2}>Name</Form.Label>
                                    <Col xs={8} sm={10}>
                                        <Form.Control type="text" defaultValue={dish.name} onChange={(e) => dish.name = e.target.value} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column xs={4} sm={2}>Type</Form.Label>
                                    <Col xs={8} sm={10}>
                                    <Form.Select 
                                        defaultValue={dish.type}
                                        onChange={(e) => dish.type = e.target.value}>
                                        <option value="All Day">All Day</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Dessert">Dessert</option>
                                    </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column xs={4} sm={2}>Price</Form.Label>
                                    <Col xs={8} sm={10}>
                                        <Form.Control type="number" defaultValue={dish.price} onChange={(e) => dish.price = e.target.value} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column xs={4} sm={2}>Image URL</Form.Label>
                                    <Col xs={8} sm={10}>
                                        <Form.Control type="text" defaultValue={dish.img_url} onChange={(e) => dish.img_url = e.target.value} />
                                        <img className="md-img" src={`${dish.img_url}`} alt="Dish" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                    </Col>
                                </Form.Group>
                                <div className="d-flex">
                                    <Button className="me-4" onClick={() => handleDishUpdate(dish._id, dish.name, dish.type, dish.price, dish.img_url)}>Save</Button>
                                    <Button onClick={() => (handleDishDelete(dish._id))}>Delete</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                ))}

                <Button onClick={ addDishBtn }>Add New Dish</Button>
            </Container>
        </div>
        
    );
}

export default ManageDishes;
