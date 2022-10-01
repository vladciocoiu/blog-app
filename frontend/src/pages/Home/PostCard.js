import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AuthContext from '../../context/AuthProvider';
import { ReactComponent as DeleteIconSVG } from "../../assets/delete-icon.svg";

export default function PostCard ({ post }) {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useContext(AuthContext);

    const handleClick = () => {
        navigate(`/posts/${post._id}`);
    }

    const deletePost = async (e) => {

        // stop event bubbling to parent div, so we do not get redirected to the single post page when clicking delete
        e.stopPropagation();

        // make api request to delete post
        try {
            const response = await axiosPrivate.delete(`${process.env.REACT_APP_API_URL}/posts/${post._id}`);

        // console log potential errors
        } catch (err) {
            console.log(err);
        }

        // reload page
        window.location.reload();
    }

    return (<div onClick={handleClick} className="post-card">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">{`by ${post.author}`}</p>
        {auth.userIsAdmin ? <button className="delete-post-button" onClick={deletePost}><DeleteIconSVG /></button> : ""}
    </div>);
}