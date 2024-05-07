import React, { useEffect, useState } from 'react';
import { getAccount, getOrder, getAllDishes, getAllRestaurants, finaliseOrder } from '../../components/api/api.js';
import OrderItem from './OrderItem.js'
import './myorder.css'
import { Form, Button } from 'react-bootstrap';
import { useNotification } from '../../components/notification/NotificationContext.js';


function MyOrderPage() {
	const displayNotification = useNotification();
	const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
	const [order, setOrder] = useState([])
	const [total, setTotal] = useState(0)

	const [allDishes, setAllDishes] = useState([]);
	const [allRestaurants, setAllRestaurants] = useState([]);

	const [cardDetails, setCardDetails] = useState({
		cardNumber: '',
		expiration: '',
		cvv: ''
	});

	const [subscribed, setSubscribed] = useState(false)

	useEffect(() => {
		const getUserAccount = async () => {
			const account = await getAccount()
			if(account.data.acc_type === "restaurant_owner"){
				setIsRestaurantOwner(true)
			} else {
				setIsRestaurantOwner(false)
				fetchOrder()
			}
			if(account.data.subscribed){
				setSubscribed(true)
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
			calcTotal(dishes, currentOrder)
		}

		const calcTotal = async (dishes, currentOrder) => {
			let tempTotal = 0;
			currentOrder.data.forEach(order => {
				dishes.data.forEach(dish => {
					if(order.id === dish._id){
						tempTotal += (Number(dish.price) * order.qty)
					}
				})
			})
			if(subscribed){
				tempTotal = tempTotal - (tempTotal*0.15)
			}
			setTotal(tempTotal)
		}

		getUserAccount();
		// eslint-disable-next-line
	}, [])

	const handleInputChange = (e) => {
		setCardDetails({...cardDetails, [e.target.name]: e.target.value});
	};

	const handlePlaceOrder = async () => {
		// Simple validation for example
		if (!cardDetails.cardNumber || !cardDetails.expiration || !cardDetails.cvv) {
			alert("Please fill in all card details.");
			return;
		}
		const result = await finaliseOrder();
		if(result.data.error){
			displayNotification('error', `${result.data.errorMsg}`);
		}
		if(result.data.success){
			displayNotification('success', `Order Placed!`);
			setTimeout(() => {
				window.location.href = `/CSIT314Project/#/order?id=${result.data.ref}`;
			}, 1500)
		}
	};
    
    
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
							{subscribed ? (
								<h5>Total: ${total.toFixed(2)} (15% discount)</h5>
							) : (
								<h5>Total: ${total.toFixed(2)}</h5>
							)}
							
							<Form>
								<Form.Group>
									<Form.Label>Card Number</Form.Label>
									<Form.Control type="text" placeholder="Enter card number" name="cardNumber" value={cardDetails.cardNumber} onChange={handleInputChange} />
								</Form.Group>
								<Form.Group>
									<Form.Label>Expiration Date</Form.Label>
									<Form.Control type="text" placeholder="MM/YY" name="expiration" value={cardDetails.expiration} onChange={handleInputChange} />
								</Form.Group>
								<Form.Group>
									<Form.Label>CVV</Form.Label>
									<Form.Control type="text" placeholder="CVV" name="cvv" value={cardDetails.cvv} onChange={handleInputChange} />
								</Form.Group>
								<Button className='click-btn' onClick={handlePlaceOrder}>Place Order</Button>
							</Form>
						</div>
					)}
				</div>
				
			)}
			</div>
        </div>
	)
}

export default MyOrderPage;