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
import NotFound from "./notfound";
import Book from "./book";
import Read from "./book/read";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "assets/pdfjs-dist/build/pdf.worker.js",
  import.meta.url
).toString();

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
        <Route path="/book/:id" element={<Book />} />
        <Route path="/book/:id/read" element={<Read />} />
        <Route path="*" element={<NotFound />} />
        {/* more... */}
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
