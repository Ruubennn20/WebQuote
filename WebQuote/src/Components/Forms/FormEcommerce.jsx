import React from 'react';
import Header from '../Header/Header';
export default function FormEcommerce() {
  return (
    <div>
      <Header/>
      <h1>Template de E-commerce</h1>
      <p>Bem-vindo à página de template para E-commerce!</p>
      <button onClick={() => window.history.back()}>
        Voltar para seleção
      </button>
    </div>
  );
}
