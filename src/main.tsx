import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App";
import Test from "./pages/Test";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App} />
      <Route path="/test" Component={Test} />
    </Routes>
  </BrowserRouter>
);
