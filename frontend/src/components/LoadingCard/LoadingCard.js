import "./LoadingCard.css";

export default function LoadingCard() {
    return <div className="loading-posts-container">
        {[0, 1].map(num => <div className={"loading-post-card loading-post-card-" + num}></div>)}
    </div>
};