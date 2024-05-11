import "./App.css";
import Logo from "./assets/images/logo.png";
import { GetBooksCount } from "../wailsjs/go/main/App";
import { useEffect, useState } from "react";

function App() {
  const [err, setErr] = useState("");
  useEffect(() => {
    GetBooksCount()
      .then((count) => {
        if (!count) {
          location.href = "/#/first_book";
          return;
        }
        location.href = "/#/home";
      })
      .catch((err) => {
        location.href = "/#/home";
      });
  }, []);

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex gap-7 items-center">
          <div>
            <img src={Logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
