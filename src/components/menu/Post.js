import "../../styles/Post.css";
import DisplayVoteCount from "./DisplayVoteCount";
import VoteCounter from "./VoteCounter";
import { useContext, useEffect, useState } from "react";
import Context from "../../store/MyContext";

const Post = (props) => {
  const ctx = useContext(Context);

  const [numUpvotes, setUpvotes] = useState(props.upvotes);
  const [numDownvotes, setDownvotes] = useState(props.downvotes);
  const [timer, setTimer] = useState(props.timeToExpire);
  const [postColor, setPostColor] = useState("");
  const [promptLogin, setPromptLogin] = useState(false);
  const [userVoted, setUserVoted] = useState(false);

  const votedWhileNoUser = () => {
    setPromptLogin(true);
  };

  const handleVote = async (vote) => {
    if (!userVoted) {
      setUserVoted(true);
      if (vote === 1) {
        setUpvotes((prev) => {
          return prev + 1;
        });
      } else {
        setDownvotes((prev) => {
          return prev + 1;
        });
      }
      ctx.updateUserKarma(vote, props.id); // update in firestore user and posts
    }
  };

  useEffect(() => {
    if (timer !== 0) {
      const frac = timer / props.timeToExpire;
      if (frac > (0.9 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__90");
      } else if (frac > (0.8 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__80");
      } else if (frac > (0.7 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__70");
      } else if (frac > (0.6 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__60");
      } else if (frac > (0.5 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__50");
      } else if (frac > (0.4 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__40");
      } else if (frac > (0.3 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__30");
      } else if (frac > (0.2 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__20");
      } else if (frac > (0.1 * props.timeToExpire) / props.timeToExpire) {
        setPostColor("post-slider__10");
      }
      const timerTicker = setTimeout(() => {
        setTimer((prev) => {
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearTimeout(timerTicker);
      };
    } else {
      ctx.hidePost(props.id);
    }
  }, [timer, props.id, ctx, postColor, props.timeToExpire]);

  const showPosterProfile = () => {
    ctx.showPosterProfile(props.id);
  };

  return (
    <div className={"post-card " + postColor}>
      <div className="post-vote-counter">
        <VoteCounter onVote={handleVote} votedWhileNoUser={votedWhileNoUser} />
      </div>
      <div className="post-poster-profile" onClick={showPosterProfile}>
        <div className="post-text">{props.text}</div>
        <div className="post-display-count">
          <DisplayVoteCount upvotes={numUpvotes} downvotes={numDownvotes} />
        </div>
        <input
          type="range"
          min="0"
          max={props.timeToExpire}
          value={timer}
          className="post-slider"
          readOnly={true}
        />
      </div>
      {promptLogin && ctx.currentUser === null && "Sign in to vote!"}
    </div>
  );
};

export default Post;
