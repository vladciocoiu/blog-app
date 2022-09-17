import axios from "axios";

export default async function LoginRequest (email, password) {
    const requestBody = { email, password };
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, JSON.stringify(requestBody), requestOptions);
    return response.data;
};