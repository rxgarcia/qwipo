import { useContext, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import NavBar from "./components/NavBar/NavBar";
import Context from "./store/MyContext";

const App = () => {
  const ctx = useContext(Context);
  console.log("refreshed app");
  console.log(ctx.currentPage);
  useEffect(() => {
    ctx.loadPosts();
  }, []);

  let content;
  if (ctx.currentPage === "home") {
    console.log("HOME");
    content = <PostList posts={ctx.postsList} />;
  } else if (ctx.currentPage === "post") {
    console.log("POST");
    content = (
      <div className="new-post-link">
        <NewPost onNewPost={ctx.handleNewPost} />
      </div>
    );
  } else if (ctx.currentPage === "profile") {
    console.log("PROF");
    content = <div>Under Construction</div>;
  }
  console.log("APP CURRENT PAGE::: ", ctx.currentPage);

  return (
    <div className="App-header">
      <header className="App-title">quickrd</header>
      <NavBar onChangePage={ctx.handlePageChange} currPage={ctx.currentPage}/>
      {content}
    </div>
  );
};

export default App;
