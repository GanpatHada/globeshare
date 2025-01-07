import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./AppRoutes";


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
      <AppRoutes />
    </div>
  );
}

export default App;
