import React, { useEffect, useState } from 'react';
import { getAccount, getOrder, getAllDishes, getAllRestaurants } from '../../components/api/api.js';
import OrderItem from './OrderItem.js'
import './myorder.css'


function MyOrderPage() {

	const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
	const [order, setOrder] = useState([])

	const [allDishes, setAllDishes] = useState([]);
	const [allRestaurants, setAllRestaurants] = useState([]);

	useEffect(() => {
		const getUserAccount = async () => {
			const account = await getAccount()
			if(account.data.acc_type === "restaurant_owner"){
				setIsRestaurantOwner(true)
			} else {
				setIsRestaurantOwner(false)
				fetchOrder()
			}
		}

		const fetchOrder = async () => {
			const currentOrder = await getOrder();
			fetchOthers(currentOrder)
		}

		const fetchOthers = async (currentOrder) => {
			const restaurants = await getAllRestaurants();
			const dishes = await getAllDishes();
			setAllRestaurants(restaurants.data);
			setAllDishes(dishes.data)
			setOrder(currentOrder.data)
		}

		getUserAccount();
	}, [])
    
    
	return (
		<div className='MyOrderPage'>
			<div className='window-pane' style={{ padding: "20px"}}>
			{ isRestaurantOwner ? (
				<h2>Sorry, this feature is only available to customer accounts.</h2>
			): (
				<div>
					<h2>My Order</h2>
					{ order.length === 0 ? (
						<p style={{marginTop: "20px"}}>Your order is currently empty, visit the home page to add items.</p>
					) : (
						<div>
							{order.map((item, index) => (
								<div key={index} className='order-item'>
									<OrderItem item={item} dishes={allDishes} restaurants={allRestaurants}></OrderItem>
								</div>
							))}
						</div>
					)}
				</div>
				
			)}
			</div>
        </div>
	)
}

export default MyOrderPage;