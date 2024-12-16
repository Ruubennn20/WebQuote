import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import './App.css'
import FormExemplo from './Forms/FormExemplo'
import FormInicial from './Forms/FormInicial'
import FormBlog from './Forms/FormBlog'
import FormEcommerce from './Forms/FormEcommerce'
import FormContacto from './Forms/FormContacto'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormInicial />} />
        <Route path="/formBlog" element={<FormBlog />} />
        <Route path="/formEcommerce" element={<FormEcommerce />} />
        <Route path="/formContacto" element={<FormContacto />} />
      </Routes>
    </Router>
      
  );
}

export default App
