export default async function RegisterRequest (name, email, password, confirmPassword) {
    const responseBody = { name, email, password, confirmPassword };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseBody),
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, requestOptions);
    const data = await response.json();
    return data;
};