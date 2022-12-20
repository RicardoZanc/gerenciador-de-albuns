import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "@popperjs/core/dist/cjs/popper.js";

import "bootstrap/dist/js/bootstrap.min.js";

import "./App.css";

import Albuns from "./components/albuns/Albuns";

function App() {
  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        {/* tst */}
        <h1 className="w-100 text-center text-light">
          Gerenciamento de Álbuns
        </h1>
      </nav>
      <div id="main-screen" className="m-5 px-4">
        <Albuns />
      </div>
    </>
  );
}

export default App;
