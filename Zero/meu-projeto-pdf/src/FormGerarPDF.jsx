// FormGerarPDF.js
import React, { useState } from 'react';

function FormGerarPDF() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const response = await fetch('http://localhost:5000/gerar-pdf-enviar-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailDoUsuario: email,
          dadosPDF: {
            nome,
            mensagem,
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
      } else {
        setStatus(data.error || 'Erro ao enviar o e-mail');
      }
    } catch (error) {
      setStatus('Erro ao se conectar com o servidor.');
    }
  };

  return (
    <div>
      <h1>Gerar PDF e Enviar E-mail</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: </label>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
          />
        </div>
        <div>
          <label>Mensagem: </label>
          <textarea 
            value={mensagem} 
            onChange={(e) => setMensagem(e.target.value)}
          />
        </div>
        <div>
          <label>E-mail: </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Gerar e Enviar</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default FormGerarPDF;
