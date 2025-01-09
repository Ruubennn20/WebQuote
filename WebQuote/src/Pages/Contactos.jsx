import React, { useState } from 'react'; 
import Header from '../Components/Header/Header';
import './Contactos.css';
import Footer2 from '../Components/Footer/Footer2';

export default function Contactos() {
  // Estados para capturar as inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // Função para lidar com a mudança de cada campo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita reload da página

    try {
      // Faz a requisição POST para o nosso backend
      const response = await fetch('http://localhost:3000/send-contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        // Reseta o formulário, se quiser
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Ocorreu um erro ao enviar a mensagem.');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <div className="contactos-container">
        <Header />
        
        <h1 className="contactos-heading">Contactos</h1>

        <div className="contactos-main">
          {/* Mapa */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Rua%20de%20Fund%C3%B5es,%20S%C3%A3o%20Jo%C3%A3o%20da%20Madeira&z=15&output=embed"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa de Rua de Fundões São João da Madeira"
            />
            <div className="contact-info-section">
              <div className="contact-info-item">
                <h3>Morada</h3>
                <p>Rua de Fundões 151, 3700-121</p>
                <p>São João da Madeira</p>
              <p></p>
              </div>
              
              <div className="contact-info-item">
                <h3>Contactos Diretos</h3>
                <p>Tel: +351 919 014 749</p>
                <p>Email: geral.webquote@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Deixe-nos a sua mensagem:</h2>
              <label htmlFor="name">Nome:</label>
              <input 
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="submit-btn">Enviar</button>
            </form>
          </div>
        </div>

        <br />
        <br />
      </div>
      <Footer2 />
    </>
  );
}
