import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  HashRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import FirstBook from "./first_book";
import Home from "./home";

const container = document.getElementById("root");

const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/first",
    element: <FirstBook />,
  },
]);

root.render(
  <React.StrictMode>
    <HashRouter basename={"/"}>
      {/* The rest of your app goes here */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/first_book" element={<FirstBook />} />
        <Route path="/home" element={<Home />} />
        {/* more... */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
