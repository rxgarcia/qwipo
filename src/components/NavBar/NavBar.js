import React from "react";

const NavBar = (props) => {

    const handleNewPost = () => {
        props.onChangePage('post')
    }

    const handleHome = () => {
        props.onChangePage('home')
    }

    const handleProfile = () => {
        props.onChangePage('profile')
    }


    return <React.Fragment>
        <header>
            <div>
                <button onClick={handleNewPost}>New Post</button>
                <button onClick={handleHome}>Home</button>
                <button onClick={handleProfile}>Profile</button>
                <hr></hr>
            </div>
        </header>
    </React.Fragment>
}

export default NavBar;