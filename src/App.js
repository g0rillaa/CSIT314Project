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
				<Route path="/account" element={<AccountPage/>}/>
				<Route path="/discover" element={<DiscoverPage/>}/>
				<Route path="/" element={<HomePage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/managerestaurant" element={<ManageRestaurantPage/>}/>
				<Route path="*" element={<NotFoundPage/>}/>
				<Route path="/register" element={<RegisterPage/>}/>
				<Route path="/subscription" element={<SubscriptionPage/>}/>
			</Routes>
		</Router>
	);
}

export default App;
