import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import webQuoteLogo from "../../assets/webQuoteLogo.jpg";

export default function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <Link className="homelink" to="/homepage">
                            <img src={webQuoteLogo} alt="Logo WebQuote" />
                        </Link>
        <Link className="header-nav" to="/">Home</Link>
        <Link className="header-nav" to="/sobre-nos">Sobre Nós</Link>
        <Link className="header-nav" to="/contactos">Contactos</Link>
        <Link className="header-nav" to="/form-main">Formulario testes Final</Link>
        
        
      </nav>
    </header>
  );
}
{/*         <Link className="header-nav" to="/form">Formulario testes</Link>
        <Link className="header-nav" to="/form-exemplo">Formulario testes02</Link>
        <Link className="header-nav" to="/form-inicial">Formulario testes03</Link> */}