import React, {useEffect, useState} from 'react';
import { loggedOutRedirect } from '../../components/auth.js';
import { getAccount, setSubscriptionStatus } from '../../components/api/api.js';
import { Form, Button } from 'react-bootstrap';

function SubscriptionPage() {
    useEffect(() => {
        loggedOutRedirect();
        fetchSubscribedState()
    }, []);



    const fetchSubscribedState = async () => {
        const response = await getAccount()
        if(response.data.error){
            return
        }
        setSubscribed(response.data.subscribed)
    }

    const [subscribed, setSubscribed] = useState(false)
    const [cardDetails, setCardDetails] = useState({
		cardNumber: '',
		expiration: '',
		cvv: ''
	});

    const handleInputChange = (e) => {
		setCardDetails({...cardDetails, [e.target.name]: e.target.value});
	};

    const handleSubscription = async (status) => {
        await setSubscriptionStatus(status)
        window.location.reload()
    }
    
	return (
        <div className='SubscriptionPage'>
            <div className='window-pane' style={{ padding: '20px'}}>
                <h1>Subscription</h1>
                <h5>Subscribe to receive discounts on food orders. 15% off standard orders!!!</h5>
                <h4>$13.99 / month</h4>
                <h3>Status: {subscribed ? 'Subscribed' : 'Not Subscribed'}</h3>
                {subscribed ? (
                    <button className='click-btn' onClick={() => handleSubscription('false')}>Unsubscribe</button>
                ) : (
                    <div>
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
                            <Button className='click-btn' onClick={() => handleSubscription('true')}>Subscribe</Button>
                        </Form>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default SubscriptionPage;