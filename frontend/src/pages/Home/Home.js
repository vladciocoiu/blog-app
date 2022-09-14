import React, { useEffect, useState } from 'react';

import getAllPosts from "./getAllPosts.js";
import PostCard from "./PostCard.js";

import "./Home.css";


export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => setPosts(await getAllPosts());
        getPosts();
        console.log(posts);
    }, []);


    return (
        <div className="posts-container">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>
    );
}