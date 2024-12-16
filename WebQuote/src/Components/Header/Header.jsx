import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link className="header-nav" to="/homepage">Home</Link>
        <Link className="header-nav" to="/sobre-nos">Sobre Nós</Link>
        <Link className="header-nav" to="/contactos">Contactos</Link>
        <Link className="header-nav" to="/form">Formulario testes</Link>
      </nav>
    </header>
  );
}
