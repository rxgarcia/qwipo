import "../../styles/Post.css";
import DisplayVoteCount from "./DisplayVoteCount";
import VoteCounter from "./VoteCounter";
import { useEffect, useState } from "react";
import db from '../../firebaseDB/firebase';
import { doc, updateDoc, increment } from "@firebase/firestore";

const Post = (props) => {
    const [numUpvotes, setUpvotes] = useState(props.upvotes);
    const [numDownvotes, setDownvotes] = useState(props.downvotes);
    const [timer, setTimer] = useState(props.timeToExpire);

    const handleVote = async (vote) => {
        const postRef = doc(db, "posts", props.id);
        if (vote === 1) {
            setUpvotes((prev) => {return prev + 1});
            await updateDoc(postRef, {
                upvotes: increment(1)
            })
        } else {
            setDownvotes((prev) => {return prev + 1});
            await updateDoc(postRef, {
                downvotes: increment(1)
            })
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimer((prev) => {return prev - 1});
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [timer])

    

    return (
        <div className="post-card">
            <div className="post-vote-counter"><VoteCounter onVote={handleVote} /></div>
            <div className="post-text">{props.text}</div>
            <div className="post-display-count">
                <DisplayVoteCount upvotes={numUpvotes} downvotes={numDownvotes} />
            </div>
            <div>
                {timer > 0 ? timer : 0}
            </div>
        </div>
    );
};

export default Post;
