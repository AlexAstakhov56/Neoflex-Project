import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
