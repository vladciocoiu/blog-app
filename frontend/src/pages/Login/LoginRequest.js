export default async function LoginRequest (email, password) {
    const responseBody = { email, password };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseBody),
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, requestOptions);
    const data = await response.json();
    return data;
};