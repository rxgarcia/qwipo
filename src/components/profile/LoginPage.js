import Modal from "../Modal/Modal"
import { useContext, useState } from "react";
import Context from "../../store/MyContext";
import profilePic from "../../assets/rigo_cat_profile.png";


const LoginPage = props => {
    const ctx = useContext(Context);

    const handleSubmit = () => {
        const dummyUser = {
            key: Math.random().toString(),
            name: "Rigo",
            profilePic: profilePic,
            email: "bruddddsderwdh@bruh.com",
            password: "lmaololbruh",
            numberPosts: 176,
            upvotes: 1234,
            downvotes: 456,
          };
        ctx.handleLogin(dummyUser);
    }

    return <Modal onClose={props.onClose}>
        <button onClick={ctx.handleWithGoogle}>Login With Google!</button>
    </Modal>
}

export default LoginPage;