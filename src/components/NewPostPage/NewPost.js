import { useState } from "react";
import NewCountdown from "../menu/NewCountdown";
import "./NewPost.css";

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
      const newPost = {
        key: Math.random().toString(),
        text: postText,
        upvotes: 0,
        downvotes: 0,
        timeToExpire: <NewCountdown timeLeft={postTimeToExpire} />,
      };
      props.onNewPost(newPost);
      setPostText("");
      // setPostInvalid(false);
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
            max="100"
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
