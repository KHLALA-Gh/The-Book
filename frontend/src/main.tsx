import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FirstBook from "./first_book";

const container = document.getElementById("root");

const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/first_book",
    element: <FirstBook />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
