import axios from "axios";

export default async function getAllPosts () {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);

        return response.data;
    
    // console log errors
    } catch (err) {
        console.log(err);
    }
}