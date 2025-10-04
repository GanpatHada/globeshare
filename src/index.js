import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Providers from "./Providers";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
     <Providers>
      <App />
    </Providers>
  </Router>
);
