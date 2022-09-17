import axios from "axios";

export default async function RegisterRequest (name, email, password, confirmPassword) {
    const requestBody = { name, email, password, confirmPassword };
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        },
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, JSON.stringify(requestBody), requestOptions);
    return response.data;
};