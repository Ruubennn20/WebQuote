import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TestimonialCard from "./components/TestimonialCard/TestimonialCard";

const testimonials = [
 
];

export default function WebQuote() {
  return (
    <>
      <GlobalStyles />
      <main className="main">
        <Header />
        <Hero />

        <section className="testimonials">
          <h2 className="section-title">Clientes e testemunhos</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-content">
            Talvez footer ou form de contacto
          </div>
        </footer>
      </main>

      <style jsx>{`
        .main {
          background-color: var(--cream);
        }
        .testimonials {
          padding: 128px 80px;
        }
        .section-title {
          color: var(--primary-purple);
          font-size: 50px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 180px;
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1274px;
          margin: 0 auto;
        }
        .footer {
          background-color: var(--primary-blue);
          padding: 619px 70px 196px;
        }
        .footer-content {
          color: var(--white);
          font-size: 50px;
          font-weight: 700;
        }
        @media (max-width: 991px) {
          .testimonials {
            padding: 40px 20px;
          }
          .section-title {
            font-size: 40px;
            margin-bottom: 40px;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .footer {
            padding: 100px 20px 110px;
          }
          .footer-content {
            font-size: 40px;
          }
        }
      `}</style>
    </>
  );
}
