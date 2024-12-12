import React from "react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="title">WebQuote</h1>
        <h2 className="subtitle">Soluções de Orçamento</h2>
        <p className="description">Clique no botão para pedir um orçamento</p>
        <button className="cta-button">Clique aqui para o orçamento</button>
      </div>
      
      <style jsx>{`
        .hero {
          display: flex;
          justify-content: space-between;
          padding: 0 50px;
          background-color: var(--primary-blue);
          color: var(--white);
        }
        .hero-content {
          width: 58%;
          padding: 40px 0;
        }
        .title {
          font-size: 50px;
          font-weight: 400;
          margin: 0;
        }
        .subtitle {
          font-size: 50px;
          font-weight: 400;
          margin: 50px 0 0;
        }
        .description {
          font-size: 50px;
          font-weight: 400;
          margin: 37px 0 0;
        }
        .cta-button {
          background-color: var(--primary-orange);
          border: none;
          border-radius: 30px;
          color: var(--white);
          cursor: pointer;
          font-size: 35px;
          margin: 73px 0 0 82px;
          padding: 40px 30px;
          box-shadow: 6px 8px 4px rgba(0, 0, 0, 0.25);
        }
        .hero-image {
          width: 42%;
        }
        .preview-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: contain;
          box-shadow: 4px 10px 4px rgba(0, 0, 0, 0.25);
        }
        @media (max-width: 991px) {
          .hero {
            flex-direction: column;
            padding: 0 20px;
          }
          .hero-content,
          .hero-image {
            width: 100%;
          }
          .title,
          .subtitle,
          .description {
            font-size: 40px;
          }
          .cta-button {
            margin: 40px 0 0;
            padding: 20px;
          }
        }
      `}</style>
    </section>
  );
}
