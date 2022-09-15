export default async function getPostComments (postId) {
    try {
        // fetch data from api
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}/comments`);

        // convert data to object
        const data = await response.json();

        // handle unsuccessful requests
        if(response.status !== 200) {
            console.log('Error while fetching data: ', data.error);
            return;
        }

        return data;

    } catch (err) {
        console.log(err);
    }
}