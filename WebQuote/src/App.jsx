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
import FormExemplo from "./Components/Forms/FormExemplo";
import FormInicial from "./Components/Forms/FormInicial";
import FormComPDF from "./Components/Forms/formcomPDFGenerator";
import FormAdmin from "./Pages/formAdmin";
import PoliticaDeCookies from "./Pages/PoliticaDeCookies";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/form" element={<FormContacto />} />
        <Route path="/form-exemplo" element={<FormExemplo />} />
        <Route path="/form-inicial" element={<FormInicial />} />
        <Route path="/form-com-pdf" element={<FormComPDF />} />
        <Route path="/form-admin" element={<FormAdmin />} />
        <Route path="/politica-cookies" element={<PoliticaDeCookies />} />
      </Routes>
    </Router>
  );
}

export default App;
