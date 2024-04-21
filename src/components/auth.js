import Cookies from 'js-cookie';
import axios from 'axios';

const TOKEN_KEY = 'auth-token';

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY);
    if(token) {
        return token;
    } else {
		return null
    }
};

export const loggedInRedirect = async () => {
	const token = Cookies.get(TOKEN_KEY);
	if(token){
		window.location.href = '/account';
        return;
	}
}

export const loggedOutRedirect = async () => {
	const token = Cookies.get(TOKEN_KEY);
    if(!token){
        console.log("No token Redirecting...");
        window.location.href = '/login';
        return;
    }
	try {
		const response = await axios.get('http://localhost:3140//api/getaccount', {
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
	} catch (error) {
		console.error('Error fetching user data:', error);
	}
}

export const saveToken = token => {
    Cookies.set(TOKEN_KEY, token, { expires: 300, secure: false, sameSite: 'true' });
};

export const clearToken = () => {
    Cookies.remove(TOKEN_KEY);
};
