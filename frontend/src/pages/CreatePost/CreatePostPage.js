import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./CreatePost.css";

export default function CreatePostPage () {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axiosPrivate.post(`${process.env.REACT_APP_API_URL}/posts`, { title, text });
        navigate('/');
    }

    return ( <div className="create-post">
        <h2>Create Post</h2>
        <form className="create-post-form" onSubmit={handleSubmit}>
            <input type="text" name="title" className="title-input" placeholder="Title" autoComplete="off" onChange={e => setTitle(e.target.value)} required />
            <textarea type="text" name="text" className="text-input" placeholder="Text" autoComplete="off" onChange={e => setText(e.target.value)} required />
            <button className="submit-button">Submit</button>
        </form>
    </div>);
};