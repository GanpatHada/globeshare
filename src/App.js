import "./App.css";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Main from "./Main";


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
              <Main />
            </PrivateRoute>
          }
        />
        <Route exact path="/auth" element={<Login />} />
        <Route exact path="/404" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
