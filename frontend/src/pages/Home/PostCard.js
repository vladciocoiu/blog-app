import React from 'react';

export default function PostCard ({ post }) {
    return (<div className="post-card">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">{`by ${post.author}`}</p>
        <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
    </div>);
}