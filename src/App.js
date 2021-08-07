import { useContext, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import NavBar from "./components/NavBar/NavBar";
import Context from "./store/MyContext";
import ProfilePage from "./components/profile/ProfilePage";
import LoginPage from "./components/profile/LoginPage";

const App = () => {
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.loadPosts();
  }, []);
  console.log(" Refreshed App | APP CURRENT PAGE::: ", ctx.currentPage);

  const hideModal = () => {
    ctx.handlePageChange("home");
  };

  console.log(ctx.currentUser);

  return (
    <div className="App-header">
      <header className="App-title">quickrd</header>
      <NavBar onChangePage={ctx.handlePageChange} currPage={ctx.currentPage} />

      {ctx.currentUser !== null && ctx.currentPage === "post" && (
        <NewPost onNewPost={ctx.handleNewPost} onClose={hideModal} />
      )}

      {ctx.currentUser !== null && ctx.currentPage === "profile" && (
        <ProfilePage
          onClose={hideModal}
          profilePic={ctx.currentUser.imgURL}
          name={ctx.currentUser.name}
          numberPosts={ctx.currentUser.numPosts}
          upvotes={ctx.currentUser.upvotes}
          downvotes={ctx.currentUser.downvotes}
        />
      )}

      {ctx.currentUser === null &&
        (ctx.currentPage === "post" || ctx.currentPage === "profile") && (
          <LoginPage onClose={hideModal}/>
        )
      }

      <PostList posts={ctx.postsList} />
    </div>
  );
};

export default App;
