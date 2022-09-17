import axios from 'axios';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';

export default function useRefreshToken () {
    const { auth, setAuth } = useContext(AuthContext);

    const refresh = async () => {
        try {
            // get new tokens
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/token`, { token: auth.refreshToken });

            // change tokens with the new ones
            setAuth(prev => { 
                return {...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken }
            });

            return response.data.accessToken;

        // catch errors
        } catch (err) {
            console.log(err);
        }
    };

    return refresh;
}