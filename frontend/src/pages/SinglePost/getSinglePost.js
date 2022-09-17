import axios from "axios";

export default async function getSinglePost (postId) {
    try {
        // get data from api and return it
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`);

        return response.data;

    // handle errors
    } catch (err) {
        console.log(err);
    }
}