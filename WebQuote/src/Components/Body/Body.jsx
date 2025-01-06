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
        <img src={Ellipse1} alt="Ellipse1" className="imgCurve" />
        <div className="body-section">
          <div className="content-container">
            <div className="left-content">
              <h1 className="webQuoteTitle">WebQuote</h1>
              <p className="webQuoteSubTitle">Soluções de Orçamento</p>
              <p className="webQuoteSubTitle">Clique no botão para pedir um orçamento</p>
              <Link to="/form-com-pdf" className="button-body">
                Clique aqui para o orçamento
              </Link>
            </div>
            <div className="right-content">
              <img src={Illustrator} alt="Ellipse2" className="right-image" />
            </div>
          </div>
        </div>

        {/* Nova seção de features */}
        <div className="features-section">
          <h2>Nossos Serviços</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Orçamentos Rápidos</h3>
              <p>Receba seu orçamento em minutos</p>
            </div>
            <div className="feature-card">
              <h3>Personalização</h3>
              <p>Soluções adaptadas às suas necessidades</p>
            </div>
            <div className="feature-card">
              <h3>Suporte 24/7</h3>
              <p>Sempre disponíveis para ajudar</p>
            </div>
          </div>
        </div>

        {/* Seção de benefícios */}
        <div className="benefits-section">
          <h2 className="h2Benefits">Por que nos escolher?</h2>
          <div className="benefits-container">
            <div className="benefit-item">
              <h3>Economia de Tempo</h3>
              <p>Processo simplificado e eficiente</p>
            </div>
            <div className="benefit-item">
              <h3>Qualidade Garantida</h3>
              <p>Excelência em cada projeto</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
