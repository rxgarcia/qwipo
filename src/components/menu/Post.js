import "./Post.css";
import DisplayVoteCount from "./DisplayVoteCount";
import VoteCounter from "./VoteCounter";
import { useState } from "react";

const Post = (props) => {
    const [voted, setVoted] = useState(false);
    const [initUpvotes, setUpvotes] = useState(props.upvotes);
    const [initDownvotes, setDownvotes] = useState(props.downvotes);

    const handleVote = (event) => {
        if (!voted) {
            setVoted(true);
            if (event === 1) {
                setUpvotes((upvotes) => {
                    return upvotes + 1;
                });
            } else {
                setDownvotes((downvotes) => {
                    return downvotes + 1;
                });
            }
        }
    };

    return (
        <div className="post-card">
            <div className="post-vote-counter"><VoteCounter onVote={handleVote} /></div>
            <div className="post-text">{props.text}</div>
            <div className="post-display-count">
                <DisplayVoteCount upvotes={initUpvotes} downvotes={initDownvotes} />
            </div>
            <div>
                {props.timeToExpire}
            </div>
        </div>
    );
};

export default Post;
