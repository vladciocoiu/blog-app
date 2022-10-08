import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./CreatePost.css";

export default function CreatePostPage () {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', text);
            formData.append('image', image);

            await axiosPrivate.post(`${process.env.REACT_APP_API_URL}/posts`, formData);

        } catch (err) {
            console.log(err);
        }
        navigate('/shared-blog/');
    }

    return ( <div className="create-post">
        <h2>Create Post</h2>
        <form className="create-post-form" onSubmit={handleSubmit}>
            <input type="text" name="title" className="title-input" placeholder="Title" autoComplete="off" onChange={e => setTitle(e.target.value)} required />
            <textarea type="text" name="text" className="text-input" placeholder="Text" autoComplete="off" onChange={e => setText(e.target.value)} required />
            <input type="file" name="img" onChange={e => setImage(e.target.files[0])} required />
            <button className="submit-button">Submit</button>
        </form>
    </div>);
};