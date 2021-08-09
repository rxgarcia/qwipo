import "../../styles/VoteCounter.css";
import upvote from "../../assets/upvote.png";
import downvote from "../../assets/downvote.png";
import Context from "../../store/MyContext";
import { useContext } from "react";

const VoteCounter = (props) => {
  const ctx = useContext(Context);

  const handleUpvote = () => {
    if (ctx.currentUser !== null) {
      // user is logged in
      props.onVote(1);
    } else {
      props.votedWhileNoUser();
    }
  };

  const handleDownvote = () => {
    if (ctx.currentUser !== null) {
      props.onVote(0);
    } else {
      props.votedWhileNoUser();
    }
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
