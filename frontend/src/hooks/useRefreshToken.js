import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

// custom hook for using a refresh token in order to get a new access token
export default function useRefreshToken () {
    const { auth, setAuth } = useContext(AuthContext);

    const refresh = async () => {
        // no explanation for this one
        // but it is neccesary in order for cookies to be sent with the request
        axios.defaults.withCredentials = true;

        try {
            // get new tokens
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/token`, {}, { withCredentials: true });

            // change tokens with the new ones
            setAuth(prev => { 
                return {...prev, accessToken: response.data.accessToken, isAdmin: response.data.isAdmin }
            });

            return response.data.accessToken;

        // catch errors
        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}