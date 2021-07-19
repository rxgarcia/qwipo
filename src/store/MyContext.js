import React, { useEffect, useState } from "react";
import Post from "../components/menu/Post";

import { addDoc, collection, doc } from "@firebase/firestore";
import db from "../firebaseDB/firebase";
import {
  deleteDoc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";

const Context = React.createContext({
  postsList: [],
  handleNewPost: (postObj) => {},
  loadPosts: () => {},
  currentPage: "",
  handlePageChange: () => {},
  hidePost: () => {},
});

export const ContextProvider = (props) => {
  const [postsList, setPostsList] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const storedPostsList = JSON.parse(localStorage.getItem("postsList"));
    if (storedPostsList !== null) {
      console.log(JSON.parse(localStorage.getItem(postsList)));
      setPostsList(storedPostsList);
    }
  }, []);

  const handleNewPost = async (newPostObj) => {
    let firebasePostDoc;
    try {
      firebasePostDoc = await addDoc(collection(db, "posts"), {
        text: newPostObj.text,
        upvotes: 0,
        downvotes: 0,
        timeToExpire: newPostObj.timeToExpire.props.timeLeft, // need to fix this... but problem for later
        viewers: 1,
      });
    } catch (e) {
      console.error("error: ", e);
    }

    const newPostComponent = (
      <Post
        key={firebasePostDoc.id}
        id={firebasePostDoc.id}
        text={newPostObj.text}
        upvotes={0}
        downvotes={0}
        timeToExpire={newPostObj.timeToExpire.props.timeLeft}
      />
    );

    setPostsList((prevPostsList) => {
      return [newPostComponent, ...prevPostsList];
    });

    localStorage.setItem("postsList", JSON.stringify(postsList));
  };

  const loadPosts = async () => {
    console.log("loading posts from context");
    const newPosts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach(async (queryDoc) => {
      for (let index in postsList) {
        if (queryDoc.id === postsList[index].key) {
          return;
        }
      }
      const newPostDoc = queryDoc.data();
      const newPostComponent = (
        <Post
          key={queryDoc.id}
          id={queryDoc.id}
          text={newPostDoc.text}
          upvotes={newPostDoc.upvotes}
          downvotes={newPostDoc.downvotes}
          timeToExpire={newPostDoc.timeToExpire}
        />
      );
      newPosts.push(newPostComponent);
      // below should incriment the viewers of this post,
      // which would only be accessed again when it deletes for everyone
      const docRef = queryDoc.ref;
      await updateDoc(docRef, {
        viewers: increment(1),
      });
      console.log("uhh");
    });
    setPostsList((prevPostsList) => {
      return [...newPosts, ...prevPostsList];
    });

    localStorage.setItem("postsList", JSON.stringify(postsList));
  };

  const hidePost = async (postID) => {
    // decriment viewers
    const docRef = doc(db, "posts", postID);
    await updateDoc(docRef, {
      viewers: increment(-1),
    });
    const docData = await getDoc(docRef);
    if (docData.data().viewers < 1) {
      console.log("deleted document:", postID);
      await deleteDoc(docRef);
    }

    console.log("hide Post: ", postID);
    setPostsList((prev) => {
      return prev.filter((post) => post.props.id !== postID);
    });
  };

  const handlePageChange = (newPage) => {
    console.log("changing page in ctx");
    setCurrentPage(newPage);
    localStorage.setItem("currentPage", currentPage);
  };
  return (
    <Context.Provider
      value={{
        postsList: postsList,
        handleNewPost: handleNewPost,
        loadPosts: loadPosts,
        currentPage: currentPage,
        handlePageChange: handlePageChange,
        hidePost: hidePost,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
