import axios from "axios";
import Form from "./components/Form/Form";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import NavBar from "./components/NavBar/NavBar";
import { Detail } from "./components/Detail/Detail";
import Landing from "./components/LandingPage/Landing";

import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000/";

function App() {
  const { pathname } = useLocation();
  const [paginaActual, setPaginaActual] = useState(1);
  return (
    <div>
      {pathname !== "/" && (
        <NavBar paginaActuale={paginaActual} setPaginaActual={setPaginaActual} />
      )}
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route
          path="/home"
          element={
            <Home paginaActual={paginaActual} setPaginaActual={setPaginaActual} />
          }
        />
        <Route path="/about" element={<About/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;