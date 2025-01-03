import React from 'react'; 
import Header from '../Components/Header/Header';
import './Contactos.css'; // Importando o arquivo CSS
import Footer from '../Components/Footer/Footer';

export default function Contactos() {
  return (
    <>
      <div className="contactos-container">
        <Header />
        
        <h1 className="contactos-heading">Contactos</h1>

        {/* Container principal para o layout lado a lado */}
        <div className="contactos-main">
          {/* Mapa do lado esquerdo */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Rua%20de%20Fund%C3%B5es,%20S%C3%A3o%20Jo%C3%A3o%20da%20Madeira&z=15&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa de Rua de Fundões São João da Madeira"
            />
            <p className="map-text">Morada:</p>
            <p className="map-text">
              Rua de Fundões 151, 3700-121 São João da Madeira
            </p>
          </div>

          {/* Formulário de contacto do lado direito */}
          
          <div className="contact-form-container">
            
            <form className="contact-form">
            <h2>Deixe-nos a sua mensagem:</h2>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="message">Mensagem:</label>
              <textarea id="message" name="message" rows="4" required></textarea>

              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </div>
        </div>
        <br />
        <br />
      </div>
      {/* Footer fora do container */}
      <Footer />
    </>
  );
}
