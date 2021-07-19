import "../../styles/VoteCounter.css";
import upvote from "../../assets/upvote.png";
import downvote from "../../assets/downvote.png";

const VoteCounter = (props) => {
  const handleUpvote = () => {
    props.onVote(1);
  };

  const handleDownvote = () => {
    props.onVote(0);
  };

  return (
    <div>
      <img
        className="downvote-button upvote-button"
        src={upvote}
        onClick={handleUpvote}
        alt="upvote"
      />
      <img
        className="downvote-button"
        src={downvote}
        onClick={handleDownvote}
        alt="downvote"
      />
    </div>
  );
};

export default VoteCounter;
