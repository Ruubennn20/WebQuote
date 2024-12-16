import React from 'react';
import Header from '../Header/Header';
export default function FormBlog() {
  return (
 
    <div>
         <Header/>
      <h1>Template de Blog</h1>
      <p>Bem-vindo à página de template para blog!</p>
      <button onClick={() => window.history.back()}>
        Voltar para seleção
      </button>
    </div>
  );
}
