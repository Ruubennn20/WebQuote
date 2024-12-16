import React from "react";
import "./Body.css";
import Ellipse1 from "../../assets/Ellipse 1.png";
import Illustrator from "../../assets/Illustrator.png";

export default function Body() {
  return (
    <>
    <body>
        <img src={Ellipse1} alt="Ellipse1" className="imgCurve" />
        <div className="body-section">
          <div className="content-container">
            <div className="left-content">
              <h1>WebQuote</h1>
              <p>Soluções de Orçamento</p>
              <p>Clique no botão para pedir um orçamento</p>
              <button className="button-body">Clique aqui para o orçamento</button>
            </div>
            <div className="right-content">
              <img src={Illustrator} alt="Ellipse2" className="right-image" />
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
