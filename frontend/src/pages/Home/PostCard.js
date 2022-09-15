import React from 'react';
import { useNavigate } from "react-router-dom";

export default function PostCard ({ post }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/posts/${post._id}`);
    }

    return (<div onClick={handleClick} className="post-card">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">{`by ${post.author}`}</p>
        <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
    </div>);
}