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
                    window.location.href = '/CSIT314Project/#/login';
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


export const createNewRestaurant = async() => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/createnewrestaurant`, {
                token: token
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const updateRestaurantDetails = async(name, location, category, imgurl) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/updaterestaurantdetails`, {
                token: token,
                name: name,
                location: location,
                category: category,
                imgurl: imgurl
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const getAllRestaurants = async() => {
    try {
        const response = await axios.get(`${apiurl}/getallrestaurants`);
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}



export const addDish = async() => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/adddish`, {
                token: token
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const getDishesFromRestaurantID = async(id) => {
    try {
        const response = await axios.get(`${apiurl}/getdishesfromrestaurantid`, {
            headers: { restaurantid: `${id}` }
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

export const updateDish = async(id, name, type, price, imgurl) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/updatedish`, {
                token: token,
                id: id,
                name: name,
                type: type,
                price: price,
                imgurl: imgurl
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const deleteDish = async(id) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/deletedish`, {
                token: token,
                id: id,
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}


export const getAllDishes = async() => {
    try {
        const response = await axios.get(`${apiurl}/getalldishes`);
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    } 
}


export const getOrder = async () => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.get(`${apiurl}/getorder`, {
                headers: { token: `${token}` }
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}


export const addToOrder = async (dishid) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/addtoorder`, {
               token: `${token}`,
               dishid: dishid
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const setOrderQty = async (dishid, qty) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/setorderqty`, {
               token: `${token}`,
               dishid: dishid,
               qty: qty
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}


export const deleteFromOrder = async (dishid) => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/deletefromorder`, {
               token: `${token}`,
               dishid: dishid
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const getPendingOrders = async () => {
    try {
        const response = await axios.get(`${apiurl}/getpendingorders`);
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}

export const finaliseOrder = async () => {
    const token = getToken()
    if(token){
        try {
            const response = await axios.post(`${apiurl}/finaliseorder`, {
               token: `${token}`
            });
            return response;
        } catch (error) {
            console.error('Error making the request:', error);
        }
    }
}

export const getOrderStatus = async (ref) => {
    try {
        const response = await axios.get(`${apiurl}/getorderstatus`, {
           headers: {ref: `${ref}`}
        });
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
    }
}