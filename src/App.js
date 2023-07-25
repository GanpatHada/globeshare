
import "./App.css";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import {Route, Routes } from "react-router-dom";
import PageNotFound from "./components/page-not-found/PageNotFound";



function App() {
  return (
    <div className="App">
        <ToastContainer
        position={"top-center"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={true}
        theme={"light"}
      />
      
      <Routes>
        <Route
          exact
          path="*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
