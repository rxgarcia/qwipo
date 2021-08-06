import { useState } from "react";
import NewCountdown from "../menu/NewCountdown";
import Modal from "../Modal/Modal";
import '../../styles/NewPost.css';

const NewPost = (props) => {
  const [postText, setPostText] = useState("");
  // const [postInvalid, setPostInvalid] = useState(false);
  const [postTimeToExpire, setTimeToExpire] = useState(3600);

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
    <Modal onClose={props.onClose} modalStyle={"modal-overlay-style"}>
      <form onSubmit={handleSubmitPost} className="new-post-form">
        <textarea type="text" value={postText} onChange={handleInputChange} className="new-post-input"/>
        <div className="timeSelector">
          1 Hr
          <input
            type="range"
            min="3600"
            max="86400"
            value={postTimeToExpire}
            onChange={handleTimeChange}
            className="timeSlider"
          />
          24 Hr
        </div>
        <button type="submit" className="new-post-submit">Post</button>
      </form>
    </Modal>
  );
};

export default NewPost;
