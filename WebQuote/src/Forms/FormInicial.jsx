import React, { useState } from 'react';
import './form.css';
import FormContacto from './FormContacto';
export default function FormInicial() {
  const [selectedForm, setSelectedForm] = useState(null);

  const renderForm = () => {
    switch (selectedForm) {
      case 'blog':
        return (
          <div className="form-container">
            <h2>Formulário para Blog</h2>
            <form>
              <label>Título do Blog:</label>
              <input type="text" placeholder="Digite o título" />
              <br />
              <label>Descrição:</label>
              <textarea placeholder="Digite a descrição" />
              <br />
              <button type="submit">Enviar</button>
            </form>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="form-container">
            <h2>Formulário para E-commerce</h2>
            <form>
              <label>Nome da Loja:</label>
              <input type="text" placeholder="Digite o nome da loja" />
              <br />
              <label>Produtos Principais:</label>
              <textarea placeholder="Descreva os produtos" />
              <br />
              <button type="submit">Enviar</button>
            </form>
          </div>
        );
      case 'contacto':
        return (
          <FormContacto />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1>Formulário para Criação de Sites</h1>
      <div className="objective-selection">
        <h2>Qual o objetivo do site?</h2>
        <div className="button-group">
          <button
            type="button"
            className="objective-button"
            onClick={() => setSelectedForm('blog')}
          >
            Blog
          </button>
          <button
            type="button"
            className="objective-button"
            onClick={() => setSelectedForm('ecommerce')}
          >
            E-COMMERCE
          </button>
          <button
            type="button"
            className="objective-button"
            onClick={() => setSelectedForm('contacto')}
          >
            CONTACTO
          </button>
        </div>
      </div>
      {renderForm()}
    </div>
  );
}
