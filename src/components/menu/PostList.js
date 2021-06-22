import "./PostList.css";
import Post from "./Post";

const PostList = (props) => {
  console.log(props);

  return (
    <div className="post-list">
      {props.posts
        .map((post) => (
          <Post
            key={post.key}
            text={post.text}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            timeToExpire={post.timeToExpire}
          />
        ))
        .sort((p1, p2) => {
          console.log("sorting");
          return (
            p2.props.upvotes +
            p2.props.downvotes -
            (p1.props.upvotes + p1.props.downvotes)
          );
        })}
    </div>
  );
};

export default PostList;
