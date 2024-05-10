import "./App.css";

import { GetBooksCount } from "../wailsjs/go/appr/AppResources";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

function App() {
  const [err, setErr] = useState("");
  useEffect(() => {
    GetBooksCount()
      .then((d) => {
        if (!d) {
          location.href = "/#/first_book";
        }
      })
      .catch((err) => {
        setErr(err.message);
      });
  });

  return (
    <>
      <h1>{err} wa</h1>
    </>
  );
}

export default App;
