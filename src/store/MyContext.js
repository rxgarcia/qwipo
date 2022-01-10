import React, { useState } from "react";
import Post from "../components/menu/Post";

// firestore imports
import { addDoc, collection, doc } from "@firebase/firestore";
import db from "../firebaseDB/firebase";
import {
  deleteDoc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// auth imports
import { auth } from "../firebaseDB/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "@firebase/auth";
import { signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Context = React.createContext({
  postsList: [],
  handleNewPost: (postObj) => {},
  loadPosts: () => {},
  currentPage: "",
  handlePageChange: () => {},
  hidePost: () => {},
  currentUser: {},
  handleLogin: () => {},
  handleSignup: () => {},
  handleWithGoogle: () => {},
  updateUserKarma: () => {},
  handleLogout: () => {},
  showPosterProfile: () => {},
  posterProfile: {},
  handleRecruiterLogin: () => {},
});

export const ContextProvider = (props) => {
  const [postsList, setPostsList] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [posterProfile, setPosterProfile] = useState(null);

  const handleRecruiterLogin = async () => {
    const recruiterRef = doc(db, "users", "W0IPTsWAbjeVWbxxu9BD"); // recruiter UID
    const recruiterUser = await (await getDoc(recruiterRef)).data();
    setCurrentUser(recruiterUser);
  }

  const showPosterProfile = async (postID) => {
    setCurrentPage("posterProfile");
    // go into post w postID, get posterID, go into poster user doc, 
    // set posterProfile to data, display in app
    const postRef = doc(db, "posts", postID);
    const posterID = await (await getDoc(postRef)).data().posterID;
    const posterRef = doc(db, "users", posterID);
    const posterData = await (await getDoc(posterRef)).data();
    setPosterProfile(posterData);
  }


  const handleLogout = () => {
    console.log("bruh");
    signOut(auth)
      .then(() => {
        setCurrentUser(null);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateUserKarma = async (vote, postID) => {
    const postRef = doc(db, "posts", postID);
    const posterID = await (await getDoc(postRef)).data().posterID;
    const posterRef = doc(db, "users", posterID);

    if (posterID === currentUser.uid) {
      setCurrentUser((prev) => {
        let userObj = { ...prev };
        if (vote === 1) {
          userObj.upvotes += 1;
        } else {
          userObj.downvotes += 1;
        }
        return userObj;
      });
    }
    
    if (vote === 1) {
      await updateDoc(postRef, {
        upvotes: increment(1),
      });
      // update posters karma
      await updateDoc(posterRef, {
        upvotes: increment(1)
      })
    } else {
      await updateDoc(postRef, {
        downvotes: increment(1),
      });
      await updateDoc(posterRef, {
        downvotes: increment(1)
      })
    }
  };

  const handleWithGoogle = async () => {
    let userObj;

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);

        // create user object and add to data base and state to present on profile page

        // user exists in Firestore, get number posts & karmas
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          console.log("USER WAS IN FIRESTORE !");
          const userData = userDoc.data();
          userObj = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            imgURL: user.photoURL,
            numPosts: userData.numPosts,
            upvotes: userData.upvotes,
            downvotes: userData.downvotes,
          };
        } else {
          // user does not exist in Firestore, so add them and init values
          console.log("USER WAS *NOT* IN FIRESTORE !!!");
          try {
            await setDoc(userRef, {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              imgURL: user.photoURL,
              numPosts: 0,
              upvotes: 0,
              downvotes: 0,
            });
          } catch (e) {
            console.error("error: ", e);
          }
          userObj = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            imgURL: user.photoURL,
            numPosts: 0,
            upvotes: 0,
            downvotes: 0,
          };
        }
      })
      .then(() => {
        setCurrentUser(userObj);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode); // why is this returning an undefined error when its working?
      });
  };

  const handleSignup = async (userObj) => {
    console.log("signed up");
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((u) => {
        const user = u.user;
        console.log(user);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMsg = e.message;
        console.log(errorCode, errorMsg);
        console.log("ERROR CREATING USER");
      });
  };

  const handleLogin = (userObj) => {
    console.log("logged in");
    signInWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((u) => {
        const user = u.user;
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPostsFromLocalStorage = () => {
    // const storedPostsList = localStorage.getItem("postsList");
    console.log(localStorage.getItem("postsList"));
    if (localStorage.getItem("postsList") !== null) {
      setPostsList(JSON.parse(localStorage.getItem("postsList")));
    }
  };

  const handleNewPost = async (newPostObj) => {
    let firebasePostDoc;
    try {
      firebasePostDoc = await addDoc(collection(db, "posts"), {
        text: newPostObj.text,
        upvotes: 0,
        downvotes: 0,
        timeToExpire: newPostObj.timeToExpire.props.timeLeft, // need to fix this... but problem for later
        viewers: 1,
        posterID: currentUser.uid,
      });
      // update post number in current user
      await updateDoc(doc(db, "users", currentUser.uid), {
        numPosts: increment(1),
      });
      // also update in current obj
      setCurrentUser((prev) => {
        let userObj = { ...prev };
        userObj.numPosts += 1;
        return userObj;
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
    getPostsFromLocalStorage();
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
        currentUser: currentUser,
        handleLogin: handleLogin,
        handleSignup: handleSignup,
        handleWithGoogle: handleWithGoogle,
        updateUserKarma: updateUserKarma,
        handleLogout: handleLogout,
        showPosterProfile: showPosterProfile,
        posterProfile: posterProfile,
        handleRecruiterLogin: handleRecruiterLogin,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
