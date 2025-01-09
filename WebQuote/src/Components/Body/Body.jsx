import React from "react";
import "./Body.css";
import Ellipse1 from "../../assets/Ellipse 1.png";
import Illustrator from "../../assets/Illustrator.png";
import { Link } from "react-router-dom";

export default function Body() {
  return (
    <>
      {/* Substituir body por div, main ou section */}
      <div className="body-wrapper">
        <div className="body-section">
          <div className="content-container">
            <div className="left-content">
              <h1 className="webQuoteTitle">WebQuote</h1>
              <p className="webQuoteSubTitle">Soluções de Orçamento</p>
              <p className="webQuoteSubTitle">Clique no botão para pedir um orçamento</p>
              <Link to="/form-main" className="button-body">
                Clique aqui para o iniciar o orçamento
              </Link>
            </div>
            <div className="right-content">
              <img src={Illustrator} alt="Ellipse2" className="right-image" />
            </div>
          </div>
        </div>

        {/* Nova seção de features */}
        <section className="features-section">
          <h2>O que a WebQuote oferece?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Automação Inteligente</h3>
              <p>Orçamentos gerados em minutos com nossa tecnologia avançada de automação. Economize tempo e recursos.</p>
            </div>
            <div className="feature-card">
              <h3>Personalização Total</h3>
              <p>Cada projeto é único. Nossa plataforma se adapta às suas necessidades específicas, garantindo resultados sob medida.</p>
            </div>
            <div className="feature-card">
              <h3>Suporte Especializado</h3>
              <p>Equipe dedicada 24/7 para auxiliar em cada etapa. Conte com profissionais experientes sempre à disposição.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
