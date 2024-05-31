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
import Library from "./library";
import NewBook from "./new_book";
import EditBook from "./book/edit";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "assets/pdfjs-dist/build/pdf.worker.js",
  import.meta.url
).toString();

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter basename={"/"}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/first_book" element={<FirstBook />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/book/:id/read" element={<Read />} />
        <Route path="/book/:id/edit" element={<EditBook />} />
        <Route path="/library" element={<Library />} />
        <Route path="/new_book" element={<NewBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
