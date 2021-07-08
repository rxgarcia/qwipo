import { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import NavBar from "./components/NavBar/NavBar";
import Post from "./components/menu/Post";
import { addDoc, collection } from "@firebase/firestore";
import db from "./firebaseDB/firebase";
import { getDocs } from "firebase/firestore";

const initPosts = [
  // <Post
  //   key={Math.random().toString()}
  //   text="HEYYYYY first Post!!"
  //   upvotes={34}
  //   downvotes={12}
  //   timeToExpire={<NewCountdown timeLeft={4} />}
  // />,
  // <Post
  //   key={Math.random().toString()}
  //   text="Second Post!!"
  //   upvotes={123}
  //   downvotes={62}
  //   timeToExpire={<NewCountdown timeLeft={30} />}
  // />,
];

const App = () => {
  const [postsList, setPostsLists] = useState(initPosts);
  const [currPage, setCurrPage] = useState("home");

  const handleNewPost = async (newPostObj) => {
    let firebasePostDoc;
    try {
      firebasePostDoc = await addDoc(collection(db, "posts"), {
        text: newPostObj.text,
        upvotes: 0,
        downvotes: 0,
        timeToExpire: newPostObj.timeToExpire.props.timeLeft, // need to fix this... but problem for later
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

    setPostsLists((prevPostsList) => {
      return [newPostComponent, ...prevPostsList];
    });
  };

  const loadPosts = async () => {
    const newPosts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      for (let index in postsList) {
        if (doc.id === postsList[index].key) {
          return;
        }
      }
      const newPostDoc = doc.data();
      const newPostComponent = (
        <Post
          key={doc.id}
          id={doc.id}
          text={newPostDoc.text}
          upvotes={newPostDoc.upvotes}
          downvotes={newPostDoc.downvotes}
          timeToExpire={newPostDoc.timeToExpire}
        />
      );
      newPosts.push(newPostComponent);
    });
    setPostsLists((prevPostsList) => {
      return [...newPosts, ...prevPostsList];
    });
  };

  // const updateLocalPosts = () => {
  //   setPostsLists((prevPostsList) => {
  //     prevPostsList.forEach((post) => {
  //       // want to save the state of timeLeft for each individual post... currently deletes cuz making new postsList obj
  //     })
  //   })
  // }

  useEffect(() => {
    loadPosts();
  }, []);

  const changePageHandler = (newPage) => {
    setCurrPage(newPage);
  };
  let content;
  if (currPage === "home") {
    // updateLocalPosts();
    content = <PostList posts={postsList} />;
    console.log(postsList);
  } else if (currPage === "post") {
    content = (
      <div className="new-post-link">
        <NewPost onNewPost={handleNewPost} />
      </div>
    );
  } else if (currPage === "profile") {
    content = <div>Under Construction</div>;
  }

  return (
    <div className="App-header">
      <header className="App-title">quickrd</header>
      <NavBar onChangePage={changePageHandler} />
      {content}
    </div>
  );
};

export default App;
