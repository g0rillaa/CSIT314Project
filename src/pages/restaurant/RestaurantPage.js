import React, { useEffect, useState } from 'react';
import { getAllRestaurants, getAllDishes } from '../../components/api/api.js';
import { Row, Col } from 'react-bootstrap';
import DishCard from '../home/components/DishCard.js'
import './restaurant.css'


function RestaurantPage() {

    const [allRestaurants, setAllRestaurants] = useState([])
    const [restaurant, setRestaurant] = useState({ name: '', img_url: '', location: '', category: '' });
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        function getRestaurantIdFromUrl() {
            const search = window.location.hash.split('?')[1];
            const params = new URLSearchParams(search);
            return params.get('id');
        }

        const fetchRestaurant = async () => {
            const restaurants = await getAllRestaurants()
            setAllRestaurants(restaurants.data)
            const restaurantID = getRestaurantIdFromUrl()
            let theRestaurant = {}
            restaurants.data.forEach(r => {
                if(r._id === restaurantID){
                    theRestaurant = r
                    setRestaurant(r);
                }
            })
            fetchDishes(theRestaurant)
        }

        const fetchDishes = async (theRestaurant) => {
            const foundDishes = await getAllDishes()
            const dishArary = []
            foundDishes.data.forEach(d => {
                if(d.restaurant === theRestaurant._id){
                    dishArary.push(d)
                }
            })
            setDishes(dishArary)
        }

        fetchRestaurant()
        
    }, [])
    
	return (
		<div className='RestaurantPage'>
            <div className='window-pane'>
                <div className='rs-icon-details'>
                    <img alt="img" className='rs-icon' src={restaurant.img_url}></img>
                    <div className='rs-details'>
                        <h1 className='rs-title'>{restaurant.name}</h1>
                        <h2 className='rs-category'>{restaurant.category}</h2>
                        <h2 className='rs-location'>{restaurant.location}</h2>
                    </div>
                </div>

                <div className='rs-dishes'>
                    <h3 style={{ marginTop: '20px' }}>Dishes</h3>
                    { dishes.length === 0 ? (
                        <p>No results found</p>
                    ) : (
                        <Row className="card-container">
                            {dishes.map((dish, index) => (
                                <Col key={index}>
                                    <DishCard dish={dish} allRestaurants={allRestaurants}/>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>
        </div>
	)
}

export default RestaurantPage;