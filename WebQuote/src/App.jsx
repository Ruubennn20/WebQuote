import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import SobreNos from "./Pages/SobreNos";
import Contactos from "./Pages/Contactos";
import FormContacto from "./Components/Forms/FormContacto";
import FormExemplo from "./Components/Forms/FormExemplo";
import FormInicial from "./Components/Forms/formcomPDFGenerator";
import FormAdmin from "./Pages/formAdmin";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectRoute";
import PoliticaDeCookies from "./Pages/PoliticaDeCookies";
import FormMainComponente from "./Components/Forms/FormMainComponente"; 
import ScrollToTop from "./Components/ScrollToTop"; // Importar o ScrollToTop



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      {/* ScrollToTop para garantir que a página inicie no topo */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/form" element={<FormContacto />} />
        <Route path="/form-exemplo" element={<FormExemplo />} />
        <Route path="/form-com-pdf" element={<FormInicial />} />
        <Route
          path="/form-admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FormAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login onLogin={setIsAuthenticated} />} />
        <Route path="/politica-cookies" element={<PoliticaDeCookies />} />
        <Route path="/form-main" element={<FormMainComponente />} />
      </Routes>
    </Router>
  );
}

export default App;
