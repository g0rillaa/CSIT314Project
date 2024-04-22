import React, { useState, useEffect } from 'react';
import { getAllRestaurants } from '../../components/api/api.js';
import { Container, Row, Col } from 'react-bootstrap';
import RestaurantCard from './components/RestaurantCard.js'
import './HomePage.css'
 
function HomePage() {
	const categories = ['All Types', 'Arabian', 'Chinese', 'Dessert', 'Italian', 'Japanese', 'Thai', 'Turkish']

    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Types');

    useEffect(() => {
        fetchAllRestaurants();
		// eslint-disable-next-line
    }, []);

	const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All Types') {
            setFilteredRestaurants(restaurants);
        } else {
            setFilteredRestaurants(restaurants.filter(restaurant => restaurant.category === category));
        }
    };

    const fetchAllRestaurants = async () => {
        const response = await getAllRestaurants();
		const allRestaurants = response.data
		console.log(allRestaurants)
        setRestaurants(allRestaurants);
        setFilteredRestaurants(allRestaurants);
    };

    return (
		<div className='window-pane'>
			<Container className='HomePage'>
				{/* Adjusted Row for the dropdown to align to the left */}
				<Row className="justify-content-start mb-4">
					<Col xs={12}>
						<div className='top-part'>
							<div className="category-list">
								{categories.map((category) => (
									<button
										key={category}
										className={`category-item ${selectedCategory === category ? 'active' : ''}`}
										onClick={() => handleCategoryClick(category)}
									>
										{category}
									</button>
								))}
							</div>
							<div className='top-part-img'></div>
						</div>
						
					</Col>
				</Row>
				<Row>
					{filteredRestaurants.map((restaurant, index) => (
						<Col key={index} sm={12} md={6} lg={4} className="mb-4">
							<RestaurantCard restaurant={restaurant} />
						</Col>
					))}
				</Row>
			</Container>
		</div>
    );
}

export default HomePage;
