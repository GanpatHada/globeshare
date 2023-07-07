import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

import BottomNavbar from './components/bottom-navbar/BottomNavbar';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import BackDrop from './components/backdrop/BackDrop';
import CreatePost from './components/create-post/CreatePost';

function App() {
  
  return (
    <div className="App">
      {/* <div id="emoji-picker">
      <EmojiPicker onEmojiClick={(emoji)=>setValue(value.concat(emoji.emoji))} />
      </div> */}
      {/* <Login/> */}
      <BackDrop/>
      <CreatePost/>
      <Home />
      {/* <BottomNavbar/> */}
    </div>
  );
}

export default App;
