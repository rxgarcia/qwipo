import { useState } from "react";
import NewCountdown from "../menu/NewCountdown";

const NewPost = (props) => {
  const [postText, setPostText] = useState("");
  // const [postInvalid, setPostInvalid] = useState(false);
  const [postTimeToExpire, setTimeToExpire] = useState(10);

  const handleInputChange = (event) => {
    setPostText(event.target.value);
  };

  const handleTimeChange = (event) => {
    console.log("time change");
    setTimeToExpire(event.target.value);
  };

  const handleSubmitPost = (event) => {
    event.preventDefault();

    if (postText.length > 0) {
      // create new post object
      props.onNewPost({
        text: postText,
        upvotes: 0,
        downvotes: 0,
        timeToExpire: <NewCountdown timeLeft={postTimeToExpire} />,
      });
      setPostText("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitPost}>
        <input type="text" value={postText} onChange={handleInputChange} />
        <div className="timeSelector">
          <input
            type="range"
            min="1"
            max="86400"
            value={postTimeToExpire}
            onChange={handleTimeChange}
            className="timeSlider"
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
