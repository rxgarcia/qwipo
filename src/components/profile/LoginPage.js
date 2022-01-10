import Modal from "../Modal/Modal";
import { useContext } from "react";
import Context from "../../store/MyContext";
import "../../styles/LoginPage.css";

const LoginPage = (props) => {
  const ctx = useContext(Context);

  return (
    <Modal onClose={props.onClose}>
      <div className="login-container">
        {ctx.currentPage === "post" && (
          <h1 className="login-sign-in">Sign in to post!</h1>
        )}
        {ctx.currentPage === "profile" && (
          <h1 className="login-sign-in">Sign in to view your profile!</h1>
        )}
        <button className="login-button" onClick={ctx.handleWithGoogle}>
          Sign in With Google
        </button>
        <button className="login-button recruiter-button" onClick={ctx.handleRecruiterLogin}>
          Recruiter Mode
        </button>
      </div>
    </Modal>
  );
};

export default LoginPage;
