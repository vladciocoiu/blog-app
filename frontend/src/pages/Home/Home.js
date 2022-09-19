import React, { useContext, useEffect, useState } from 'react';

import getAllPosts from "./getAllPosts.js";
import PostCard from "./PostCard.js";

import "./Home.css";
import AuthContext from '../../context/AuthProvider.js';


export default function Home() {
    const [posts, setPosts] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const getPosts = async () => setPosts(await getAllPosts());
        getPosts();
    }, []);

    return (
        <div className="posts-container">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
    );
}