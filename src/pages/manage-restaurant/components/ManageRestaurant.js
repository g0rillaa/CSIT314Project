import React, { useState, useEffect } from 'react';
import { getAccount, getRestaurantFromUsername, createNewRestaurant, updateRestaurantDetails } from '../../../components/api/api.js';
import { useNotification } from '../../../components/notification/NotificationContext.js';
import { Form, Button, Container } from 'react-bootstrap';

function ManageRestaurant() {
    const displayNotification = useNotification();
    const [ownsRestaurant, setOwnsRestaurant] = useState(false);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');
    const [restaurantCategory, setRestaurantCategory] = useState('All Types');
    const categories = ["All Types", "Dessert", "Turkish", "Chinese", "Japanese", "Thai", "Italian", "Arabian"].sort((a, b) => a === "All Types" ? -1 : a.localeCompare(b));

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        const account = await getAccount();
        const restaurant = await getRestaurantFromUsername(account.data.username);
        if(restaurant.data.error){
            setOwnsRestaurant(false);
            return;
        }
        setOwnsRestaurant(true);
        setRestaurantName(restaurant.data.name);
        setRestaurantLocation(restaurant.data.location);
        setRestaurantCategory(restaurant.data.category || 'All Types');
    };

    const createNewRestaurantBtn = async () => {
        const result = await createNewRestaurant();
        if(result.data.error){
            displayNotification('error', `${result.data.errorMsg}`);
            return;
        }
        if(result.data.success){
            window.location.reload();
        }
    };

    const writeValues = async () => {
        const result = await updateRestaurantDetails(restaurantName, restaurantLocation, restaurantCategory)
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
                <h1 className='title'>Manage Restaurant</h1>
                {ownsRestaurant ? (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={restaurantName} 
                                onChange={e => setRestaurantName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={restaurantLocation} 
                                onChange={e => setRestaurantLocation(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                value={restaurantCategory} 
                                onChange={e => setRestaurantCategory(e.target.value)}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" onClick={() => writeValues()}>Save</Button>
                    </Form>
                ) : (
                    <Button variant="primary" onClick={createNewRestaurantBtn}>Click to create a restaurant</Button>
                )}
            </Container>
        </div>
        
    );
}

export default ManageRestaurant;
