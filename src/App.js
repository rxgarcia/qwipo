import { useState } from 'react';
import './App.css';
import PostList from './components/menu/PostList';
import NewPost from './components/NewPostPage/NewPost';

const initPosts = [
  {
    key: Math.random().toString(),
    text: "HEYYYYY first Post!!",
    upvotes: 34,
    downvotes: 12,
    
  },
  {
    key: Math.random().toString(),
    text: "second post omg",
    upvotes: 67,
    downvotes: 32
  },
  {
    key: Math.random().toString(),
    text: "yooooo",
    upvotes: 342,
    downvotes: 121
  }
]



const App = () => {

  const [postsList, setPostsLists] = useState(initPosts);


  const handleNewPost = (newPost) => {
    setPostsLists((prevPostsList) => {
      return [newPost, ...prevPostsList];
    })
  }



  return (
    <div className="App-header">
      <header className="App-title">quickrd</header>
      <div className="new-post-link">
        <NewPost onNewPost={handleNewPost}/>
      </div>
      <PostList posts={postsList}/>
    </div>
  );
}

export default App;
