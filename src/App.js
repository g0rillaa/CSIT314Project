import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './global.css'

import AccountPage from './pages/account/AccountPage.js';
import DiscoverPage from './pages/discover/DiscoverPage.js';
import HomePage from './pages/home/HomePage.js';
import LoginPage from './pages/login/LoginPage.js';
import ManageRestaurantPage from './pages/manage-restaurant/ManageRestaurantPage.js';
import NotFoundPage from './pages/notfound/NotFoundPage.js';
import RegisterPage from './pages/register/RegisterPage.js';
import SubscriptionPage from './pages/subscription/SubscriptionPage.js';

import Navbar from './components/navbar/navbar.js';


function App() {
	

	return (
		<Router>
			<Navbar/>
			<Routes>
				<Route path="/CSIT314Project/account" element={<AccountPage/>}/>
				<Route path="/CSIT314Project/discover" element={<DiscoverPage/>}/>
				<Route path="/CSIT314Project/" element={<HomePage/>}/>
				<Route path="/CSIT314Project/login" element={<LoginPage/>}/>
				<Route path="/CSIT314Project/managerestaurant" element={<ManageRestaurantPage/>}/>
				<Route path="/CSIT314Project/*" element={<NotFoundPage/>}/>
				<Route path="/CSIT314Project/register" element={<RegisterPage/>}/>
				<Route path="/CSIT314Project/subscription" element={<SubscriptionPage/>}/>
			</Routes>
		</Router>
	);
}

export default App;
