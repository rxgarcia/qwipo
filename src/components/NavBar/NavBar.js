import React from "react";
import "../../styles/NavBar.css";
import newPostImg from "../../assets/new_post.png";
import homeImg from "../../assets/home-logo.png";
import profileImg from "../../assets/profile-logo.png";

const NavBar = (props) => {
  const handleNewPost = () => {
    props.onChangePage("post");
  };

  const handleHome = () => {
    props.onChangePage("home");
  };

  const handleProfile = () => {
    props.onChangePage("profile");
  };

  return (
    <React.Fragment>
      <header className="navbar-header">
        <div>
          <ul className="navbar-buttons">
            <li className="navbar-item">
              <img
                className="new-post"
                src={newPostImg}
                onClick={handleNewPost}
                alt="new post"
              />
            </li>
            <li className="navbar-item">
              <img
                className="home"
                src={homeImg}
                onClick={handleHome}
                alt="home"
              />
            </li>
            <li className="navbar-item">
              <img
                className="profile"
                src={profileImg}
                onClick={handleProfile}
                alt="profile"
              />
            </li>
          </ul>
        </div>
      </header>
    </React.Fragment>
  );
};

export default NavBar;
