import axios from 'axios';

// clear auth context anddo a request to the logout function of the api
export default async function LogoutRequest (setAuth) {
    setAuth({});
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/users/logout`, { withCredentials: true });
    
    } catch (err) {
        console.log(err);
    }
};