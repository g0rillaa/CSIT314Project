import Cookies from 'js-cookie';
import axios from 'axios';

const TOKEN_KEY = 'auth-token';

const apiurl = process.env.REACT_APP_API_URL

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
		window.location.href = '/CSIT314Project/account';
        return;
	}
}

export const loggedOutRedirect = async () => {
	const token = Cookies.get(TOKEN_KEY);
    if(!token){
        console.log("No token Redirecting...");
        window.location.href = '/CSIT314Project/login';
        return;
    }
	try {
		const response = await axios.get(`${apiurl}/getaccount`, {
			headers: { token: `${token}` }
		});
		if(response.data.error){
			if(response.data.errorMsg === 'Invalid token'){
				clearToken()
				console.log("Invalid token Redirecting...");
				window.location.href = '/CSIT314Project/login';
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
