import "./VoteCounter.css";

const VoteCounter = (props) => {
    const handleUpvote = () => {
        props.onVote(1);
    };

    const handleDownvote = () => {
        props.onVote(0);
    };

    return (
        <div>
            <button className="upvote" onClick={handleUpvote}>
                Upvote
      </button>
            <button className="upvote" onClick={handleDownvote}>
                Downvote
      </button>
        </div>
    );
};

export default VoteCounter;
