import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import SobreNos from "./Pages/SobreNos";
import Contactos from "./Pages/Contactos";
import FormContacto from "./Components/Forms/FormContacto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/form" element={<FormContacto />} />
      </Routes>
    </Router>
  );
}

export default App;
