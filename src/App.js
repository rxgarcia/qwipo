import { useContext, useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import NavBar from "./components/NavBar/NavBar";
import Context from "./store/MyContext";
import Modal from "./components/Modal/Modal";
import ProfilePage from "./components/profile/ProfilePage";
import profilePic from "./assets/rigo_cat_profile.png";

const currentUser = {
  key: Math.random().toString(),
  name: "Rigo",
  profilePic: profilePic,
  numberPosts: 176,
  upvotes: 1234,
  downvotes: 456,
};

const App = () => {
  const [showCreatePost, setCreatePost] = useState(false);
  const ctx = useContext(Context);
  useEffect(() => {
    ctx.loadPosts();
  }, []);
  console.log(" Refreshed App | APP CURRENT PAGE::: ", ctx.currentPage);

  const hideModal = () => {
    ctx.handlePageChange("home");
  };

  return (
    <div className="App-header">
      <header className="App-title">quickrd</header>
      <NavBar onChangePage={ctx.handlePageChange} currPage={ctx.currentPage} />
      {ctx.currentPage === "post" && (
        <NewPost onNewPost={ctx.handleNewPost} onClose={hideModal} />
      )}
      {ctx.currentPage === "profile" && (
        <ProfilePage
          onClose={hideModal}
          profilePic={currentUser.profilePic}
          name={currentUser.name}
          numberPosts={currentUser.numberPosts}
          upvotes={currentUser.upvotes}
          downvotes={currentUser.downvotes}
        />
      )}
      <PostList posts={ctx.postsList} />
    </div>
  );
};

export default App;
