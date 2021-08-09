import "../../styles/PostList.css";

const PostList = (props) => {
  const postsContent = props.posts.sort((p1, p2) => {
    console.log("sorting");
    return (
      p2.props.upvotes +
      p2.props.downvotes -
      (p1.props.upvotes + p1.props.downvotes)
    );
  });

  return (
    <div className="post-list">
      {props.posts && postsContent}
    </div>
  );
};

export default PostList;
