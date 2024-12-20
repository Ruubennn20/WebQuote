import React from "react";
import "./Cards.css";
import Vector1 from "../../assets/Vector1.png";
import imgCard1 from "../../assets/imgCard1.png";
import imgCard2 from "../../assets/imgCard2.png";


export default function Cartao1and2() {
  return (
    <>
      <div className="cards-container">
        <div className="card-content">
          <div className="text-section">
            <h2 className="card-title02">Escolher a WebQuote ?</h2>
            <h3 className="card-subtitle02">Orçamentos na hora...</h3>
            <p className="card-text02">
              Na nossa empresa, simplificamos o processo de planejar e orçamentar o seu webSite e/ou E-Commerce.
              Com a nossa ferramenta automatizada, você pode personalizar o projeto de acordo com suas necessidades,
              escolhendo o tipo de webSite, funcionalidades desejadas e serviços adicionais.
              Em poucos cliques, geramos um orçamento detalhado em PDF, com transparência e clareza,
              para que você tenha todas as informações necessárias na palma da mão.
              Seja para sites institucionais ou lojas virtuais, garantimos praticidade e qualidade desde o primeiro passo.
            </p>
          </div>
          <div className="image-section">
            <div className="image-stack">
              <img src={Vector1} alt="Vector1" className="background-shape" />
              <div className="image-container">
                <img src={imgCard1} alt="Business" className="card-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* alterar o texto para a direita e imagem para a esquerda */}
      <div className="cards-container02">
        <div className="card-content02">
          <div className="text-section">
            <h2 className="card-title">Escolher a WebQuote ?</h2>
            <h3 className="card-subtitle">Simples e Prático...</h3>
            <p className="card-text">
              Transformar ideias em realidade nunca foi tão simples.
              Nossa plataforma oferece uma solução ágil e eficiente para quem deseja criar um webSite ou E-Commerce sob medida.
              Basta selecionar o tipo de projeto e os serviços que melhor atendem às suas necessidades,
              e em instantes você receberá um orçamento completo e profissional em PDF.
              Essa abordagem prática permite que você visualize todos os detalhes do investimento,
              enquanto cuidamos para entregar o melhor em design e funcionalidade.
            </p>
          </div>
          <div className="image-section">
            <div className="image-stack">
              <img src={Vector1} alt="Vector1" className="background-shape" />
              <div className="image-container">
                <img src={imgCard2} alt="Business" className="card-image" />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        
      </div>
    </>
  );
}
