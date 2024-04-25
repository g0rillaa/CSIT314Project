import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

import AccountPage from './pages/account/AccountPage';
import DiscoverPage from './pages/discover/DiscoverPage';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import ManageRestaurantPage from './pages/manage-restaurant/ManageRestaurantPage';
import ManageDishesPage from './pages/manage-dishes/ManageDishesPage';
import NotFoundPage from './pages/notfound/NotFoundPage';
import RegisterPage from './pages/register/RegisterPage';
import SubscriptionPage from './pages/subscription/SubscriptionPage';

import Navbar from './components/navbar/navbar.js';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/account" element={<AccountPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/managedishes" element={<ManageDishesPage />} />
                <Route path="/managerestaurant" element={<ManageRestaurantPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
