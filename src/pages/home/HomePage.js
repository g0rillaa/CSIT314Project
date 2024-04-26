import React, { useState, useEffect } from 'react';
import { getAllRestaurants, getAllDishes } from '../../components/api/api.js';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import RestaurantCard from './components/RestaurantCard.js'
import DishCard from './components/DishCard.js'
import './HomePage.css'
 
function HomePage() {
	const categories = ['All Types', 'Arabian', 'Chinese', 'Dessert', 'Italian', 'Japanese', 'Thai', 'Turkish']

    const [restaurants, setRestaurants] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
	const [filteredDishes, setFilteredDishes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Types');
	const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAllRestaurants();
		fetchAllDishes();
		// eslint-disable-next-line
    }, []);

	useEffect(() => {
        const filteredRests = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const filteredDishs = dishes.filter(dish => dish.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredRestaurants(filteredRests);
        setFilteredDishes(filteredDishs);
    }, [searchTerm, restaurants, dishes]);

	const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All Types') {
            setFilteredRestaurants(restaurants);
			setFilteredDishes(dishes)
        } else {
            setFilteredRestaurants(restaurants.filter(restaurant => restaurant.category === category));
			const fDishes = []
			dishes.forEach(d => {
				restaurants.forEach(r => {
					if(d.restaurant === r._id){
						if(r.category === category){
							fDishes.push(d)
						}
					}
				})
			})
			setFilteredDishes(fDishes)
        }
    };

    const fetchAllRestaurants = async () => {
        const response = await getAllRestaurants();
		const allRestaurants = response.data
        setRestaurants(allRestaurants);
        setFilteredRestaurants(allRestaurants);
    };

	const fetchAllDishes = async () => {
		const response = await getAllDishes();
		const allDishes = response.data
        setDishes(allDishes);
        setFilteredDishes(allDishes);
	}

    return (
		<div className='window-pane'>
			<Container className='HomePage'>
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
                    <Col xs={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search for restaurants or dishes..."
                                aria-label="Search"
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                </Row>
				
				<h3>Restaurants</h3>
				<Row className="restaurant-card-container">
					{ filteredRestaurants.length === 0 ? (
						<p>No results found</p>
					) : (<div></div>)}
					{filteredRestaurants.map((restaurant, index) => (
						<Col key={index} sm={12} md={6} lg={4} className="mb-4">
							<RestaurantCard restaurant={restaurant} />
						</Col>
					))}
				</Row>

				<h3>Dishes</h3>
				<Row>
					{ filteredDishes.length === 0 ? (
						<p>No results found</p>
					) : (<div></div>)}
					{filteredDishes.map((dish, index) => (
						<Col key={index} sm={12} md={6} lg={4} className="mb-4">
							<DishCard dish={dish} allRestaurants={restaurants}/>
						</Col>
					))}
				</Row>
			</Container>
		</div>
    );
}

export default HomePage;
