import { useContext, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import NavBar from "./components/NavBar/NavBar";
import Context from "./store/MyContext";
import ProfilePage from "./components/profile/ProfilePage";
import LoginPage from "./components/profile/LoginPage";
import logoutButton from "./assets/logout.png";

const App = () => {
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.loadPosts();
  }, []);
  console.log(" Refreshed App | APP CURRENT PAGE::: ", ctx.currentPage);

  const hideModal = () => {
    ctx.handlePageChange("home");
  };

  const logoutContent = (
    <div className="app-profile-logout">
      <img src={logoutButton} onClick={ctx.handleLogout} alt="logout" />
    </div>
  );

  console.log(ctx.currentUser);

  return (
    <div className="App-header">
      <header className="App-title">qwipo</header>
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

      {ctx.posterProfile !== null && ctx.currentPage === "posterProfile" && (
        <ProfilePage
          onClose={hideModal}
          profilePic={ctx.posterProfile.imgURL}
          name={ctx.posterProfile.name}
          numberPosts={ctx.posterProfile.numPosts}
          upvotes={ctx.posterProfile.upvotes}
          downvotes={ctx.posterProfile.downvotes}
        />
      )}

      {ctx.currentUser === null &&
        (ctx.currentPage === "post" || ctx.currentPage === "profile") && (
          <LoginPage onClose={hideModal} />
        )}

      <PostList posts={ctx.postsList} />
      {ctx.currentUser !== null && logoutContent}
    </div>
  );
};

export default App;
