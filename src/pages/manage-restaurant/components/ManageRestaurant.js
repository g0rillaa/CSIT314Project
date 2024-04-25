import React, { useState, useEffect } from 'react';
import { getAccount, getRestaurantFromUsername, createNewRestaurant, updateRestaurantDetails } from '../../../components/api/api.js';
import { useNotification } from '../../../components/notification/NotificationContext.js';
import { Form, Button, Container } from 'react-bootstrap';

import './managerestaurant.css'

function ManageRestaurant() {
    const displayNotification = useNotification();
    const [ownsRestaurant, setOwnsRestaurant] = useState(false);
    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantLocation, setRestaurantLocation] = useState('');
    const [restaurantCategory, setRestaurantCategory] = useState('All Types');
    const [restaurantImgURL, setRestaurantImgURL] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const categories = ["All Types", "Dessert", "Turkish", "Chinese", "Japanese", "Thai", "Italian", "Arabian"].sort((a, b) => a === "All Types" ? -1 : a.localeCompare(b));

    useEffect(() => {
        fetchRestaurant();
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault(); // Standard for most browsers
                event.returnValue = ''; // Required for Chrome
            }
        };

        // Add event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty]);

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
        setRestaurantImgURL(restaurant.data.img_url);
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

    const directToManageDishes = async () => {
        return window.location.href = '/CSIT314/#/managedishes'
    }

    const writeValues = async () => {
        const result = await updateRestaurantDetails(restaurantName, restaurantLocation, restaurantCategory, restaurantImgURL)
        if(result.data.error){
            displayNotification('error', `${result.data.errorMsg}`);
            return;
        }
        if(result.data.success){
            setIsDirty(false);
            setTimeout(() => {
                window.location.reload();
            },50)
            
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
                                onChange={e => {setRestaurantName(e.target.value); setIsDirty(true)}} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={restaurantLocation} 
                                onChange={e => {setRestaurantLocation(e.target.value); setIsDirty(true);}} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                value={restaurantCategory} 
                                onChange={e => {setRestaurantCategory(e.target.value); setIsDirty(true)}}
                            >
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL (can upload a photo to discord and paste url in here)</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={restaurantImgURL} 
                                onChange={e => {setRestaurantImgURL(e.target.value); setIsDirty(true)}}
                            />
                            <img className="mr-logo-display" src={`${restaurantImgURL}`} alt='img'></img>
                        </Form.Group>
                        <Button variant="primary" onClick={() => writeValues()}>Save</Button>
                        { isDirty ? (
                            <p className='mr-unsaved'>(Unsaved)</p>
                        ): (<p></p>)}
                        <div className='mr-dishes-btn-div'>
                            <Button variant="primary" onClick={directToManageDishes}>Manage Dishes</Button>
                        </div>
                    </Form>
                ) : (
                    <Button variant="primary" onClick={createNewRestaurantBtn}>Click to create a restaurant</Button>
                )}
            </Container>
        </div>
        
    );
}

export default ManageRestaurant;
