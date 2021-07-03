import {useState,  useEffect} from "react";
import "./App.css";
import PostList from "./components/menu/PostList";
import NewPost from "./components/NewPostPage/NewPost";
import "./components/NewPostPage/NewPost.css";
// import NewCountdown from "./components/menu/NewCountdown";
import NavBar from './components/NavBar/NavBar';

// const initPosts = [
//   {
//     key: Math.random().toString(),
//     text: "HEYYYYY first Post!!",
//     upvotes: 34,
//     downvotes: 12,
//     timeToExpire: <NewCountdown timeLeft={4} />,
//   },
//   {
//     key: Math.random().toString(),
//     text: "second post omg",
//     upvotes: 67,
//     downvotes: 32,
//     timeToExpire: <NewCountdown timeLeft={20} />,
//   },
//   {
//     key: Math.random().toString(),
//     text: "yooooo",
//     upvotes: 342,
//     downvotes: 121,
//     timeToExpire: <NewCountdown timeLeft={60} />,
//   },
// ];

const App = () => {
  const [postsList, setPostsLists] = useState([]);
  const [currPage, setCurrPage] = useState("home");
  // const [loading, setLoading] = useState(false);

  // const fetchPosts = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('');
  //     if (!response.ok) {
  //       throw new Error('problem getting response');
  //     }
      
  //     const data = await response.json();
  //     console.log(data);
  //     const loadedPosts = [];
  //     for (const i in data) {
  //       loadedPosts.push({
  //         key: data[i].key,
  //         text: data[i].text,
  //         upvotes: data[i].upvotes,
  //         downvotes: data[i].downvotes,
  //         timeToExpire: <NewCountdown timeLeft={data[i].timeToExpire.props.timeLeft} onDone={handleDeletePost} postKey={data[i].key}/>,
  //       });
  //     }
  //     console.log(loadedPosts);
  //     setPostsLists(loadedPosts);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  //   setLoading(false);
  // };

  const addPostHandler = async (post) => {
    // const response = await fetch('', {
    //   method: 'POST',
    //   body: JSON.stringify(post),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const data = await response.json();
  }

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   console.log(postsList);
    //   fetchPosts();
    // }, 2000);
    return () => {};
  }, [postsList])

  // const handleDeletePost = (postKey) => {
  //   console.log('removing post w key: ' + postKey);
  // }

  const handleNewPost = (newPost) => {
    addPostHandler(newPost);
    setPostsLists((prevPostsList) => {
      return [newPost, ...prevPostsList];
    });
  };

  const changePageHandler = (newPage) => {
    setCurrPage(newPage);
  }

  let content;

  if (currPage === "home") {

    content = <PostList posts={postsList} />;
  }
  if (currPage === "post") {
    content = (
      <div className="new-post-link">
        <NewPost onNewPost={handleNewPost} />
      </div>
    );
  }
  if (currPage === "profile") {
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
