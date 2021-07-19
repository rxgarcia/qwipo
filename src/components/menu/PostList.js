import "../../styles/PostList.css";

const PostList = (props) => {
  return (
    <div className="post-list">
      {props.posts && props.posts
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
