import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App";
import Test from "./pages/Test";
import { Demo } from "./pages/Demo";
import { ErrorPagesDemo } from "./pages/ErrorPagesDemo";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route Component={App}>
        <Route index />
        <Route path=":flow" />
      </Route>
      <Route path="/test" Component={Test} />
      <Route path="/demo" Component={Demo} />
      <Route path="/errors" Component={ErrorPagesDemo} />
    </Routes>
  </BrowserRouter>
);
