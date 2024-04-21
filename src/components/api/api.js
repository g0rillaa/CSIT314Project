import axios from 'axios';
import { getToken, clearToken } from '../auth.js'

const apiurl = process.env.REACT_APP_API_URL


export const getAccount = async () => {
    const token = getToken()
    if(token) {
        try {
            const response = await axios.get(`${apiurl}/getaccount`, {
                headers: { token: `${token}` }
            });
            if(response.data.error){
                if(response.data.errorMsg === 'Invalid token'){
                    clearToken()
                    console.log("Invalid token Redirecting...");
                    window.location.href = '/login';
                    return;
                }
            }
            return response;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
};


export const login = async (username, password) => {
    try {
        const response = await axios.post(`${apiurl}/login`, {
            username: username,
            password: password
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}


export const register = async (username, password, accType) => {
    try {
        const response = await axios.post(`${apiurl}/registeraccount`, {
            username: username,
            password: password,
            acctype: accType
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}


export const getRestaurantFromUsername = async (name) => {
    try {
        const response = await axios.get(`${apiurl}/getrestaurantfromusername`, {
            headers: { username: `${name}` }
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}


export const createNewRestaurant = async (owner) => {
    try {
        const response = await axios.post(`${apiurl}/createnewrestaurant`, {
            owner: owner
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}