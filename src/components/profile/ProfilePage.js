import Modal from "../Modal/Modal";
import KarmaDisplay from "./KarmaDisplay";
import "../../styles/ProfilePage.css";

const ProfilePage = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <div className="profile-page-container">
        <div className="profile-page-head">
          <div>
            <img src={props.profilePic} className="profile-page-img" alt="user profile"/>
          </div>
          <div className="profile-page-name">{props.name}</div>
        </div>
        <div>{props.numberPosts} Posts</div>
        <div>
          <KarmaDisplay upvotes={props.upvotes} downvotes={props.downvotes} />
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePage;
