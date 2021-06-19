import { useState } from "react";

const NewPost = (props) => {
  const [postText, setPostText] = useState("");
  const [postInvalid, setPostInvalid] = useState(false);

  const handleInputChange = (event) => {
    setPostText(event.target.value);
  };

  const handleSubmitPost = (event) => {
    if (postText.length > 0) {
        event.preventDefault();

        // create new post object
        const newPost = {
          key: Math.random().toString(),
          text: postText,
          upvotes: 0,
          downvotes: 0,
        };
        props.onNewPost(newPost);
        setPostText("");
        setPostInvalid(false);
    } else {
        setPostInvalid(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitPost}>
        <input type="text" value={postText} onChange={handleInputChange} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default NewPost;
