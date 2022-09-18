import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import getSinglePost from './getSinglePost';
import getPostComments from './getPostComments';
import "./SinglePost.css";


export default function SinglePost() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getPost = async () => setPost(await getSinglePost(postId));
        getPost();
    }, []);

    useEffect(() => {
        const getComments = async () => setComments(await getPostComments(postId));
        getComments();
    }, []);

    return (
        <main className="single-post">
            <h4 className="post-title">{ post.title }</h4>
            <div className="post-details">
                <p className="post-author">{ `Written by ${post.author}` }</p>
                <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="post-time">{new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
            <p className="post-text">{ post.text }</p>
            <section className="comment-section">
                <h5 className="comment-heading">{ `Comments (${comments.length})` }</h5>
                <div className="post-comments">
                    { comments.map(comment => <div className='comment' key={comment._id}>
                        <p className="comment-author">{ comment.author }</p>
                        <p className="comment-date">{ new Date(comment.createdAt).toLocaleString() }</p>
                        <p className='comment-text'>{ comment.text }</p>
                    </div>)}
                </div>
            </section>
        </main>
    );
}