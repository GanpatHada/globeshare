import logo from './logo.svg';
import './App.css';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

import BottomNavbar from './components/bottom-navbar/BottomNavbar';

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      <Home />
      {/* <BottomNavbar/> */}
    </div>
  );
}

export default App;
