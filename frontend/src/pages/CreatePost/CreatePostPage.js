import { useContext } from "react";

import AuthContext from "../../context/AuthProvider";
import "./CreatePost.css";

export default function CreatePostPage () {
    return ( <div className="create-post">
        <h2>Create Post</h2>
        <form className="create-post-form">
            <input type="text" name="title" className="title-input" placeholder="Title" autoComplete="off" required />
            <textarea type="text" name="text" className="text-input" placeholder="Text" autoComplete="off" required />
            <button className="submit-button">Submit</button>
        </form>
    </div>);
};