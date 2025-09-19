import "./Home.css";
import Suggestions from "./components/suggestions/Suggestions";
import Feed from "./components/feed/Feed";

const Home = () => {
  return (
    <div className="app-pages" id="home-page">
      <Feed />
      <Suggestions />
    </div>
  );
};

export default Home;
