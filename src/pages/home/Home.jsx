import "./Home.css";
import Suggestions from "./components/suggestions/Suggestions";
import Feed from "./components/feed/Feed";
import SortFilter from "./components/sortFilter/SortFilter";
import { useState } from "react";

const Home = () => {
  const [filter,setFilter]=useState('Trending')
  return (
    <div className="app-pages" id="home-page">
      <Feed filter={filter} />
      <SortFilter filter={filter} setFilter={setFilter}/>
      <Suggestions />
    </div>
  );
};

export default Home;
