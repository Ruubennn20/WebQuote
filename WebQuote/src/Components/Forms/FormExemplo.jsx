import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './form.css';
import Header from '../Header/Header';

export default function FormExemplo() {
  const [formData, setFormData] = useState({
    objective: '',
    pages: [],
    features: [],
    style: '',
    audience: '',
    deadline: '',
    budget: '',
    references: '',
    email: '', // Campo para e-mail
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.checked
          ? [...(prevData[name] || []), value]
          : (prevData[name] || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = JSON.stringify(formData);

    const jsonBlob = new Blob([jsonData], { type: 'application/json' });

    

    const doc = new jsPDF();

    doc.text('Formulário para Criação de Sites', 10, 10);
    doc.text(`Objetivo: ${formData.objective}`, 10, 20);
    doc.text(`Páginas: ${formData.pages.join(', ')}`, 10, 30);
    doc.text(`Funcionalidades: ${formData.features.join(', ')}`, 10, 40);
    doc.text(`Estilo: ${formData.style}`, 10, 50);
    doc.text(`Público-alvo: ${formData.audience}`, 10, 60);
    doc.text(`Prazo: ${formData.deadline}`, 10, 70);
    doc.text(`Orçamento: ${formData.budget}`, 10, 80);
    doc.text(`Referências: ${formData.references}`, 10, 90);

    // Salva o PDF como blob
    const pdfBlob = doc.output('blob');

    // Enviar para o backend (exemplo de requisição fetch)
    const formDataToSend = new FormData();
    formDataToSend.append('pdf', pdfBlob);
    formDataToSend.append('email', formData.email);

    doc.save('formulario.pdf'); // Salva o PDF localmente


  





    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('E-mail enviado com sucesso!');
      } else {
        alert('Falha ao enviar e-mail.');
      }
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  };


  const doc = new jsPDF();

doc.setFontSize(12);
doc.text('Formulário para Criação de Sites', 10, 10);
doc.text(`Objetivo: ${formData.objective || 'Não especificado'}`, 10, 20);
doc.text(`Páginas: ${formData.pages.join(', ') || 'Nenhuma selecionada'}`, 10, 30);
doc.text(`Funcionalidades: ${formData.features.join(', ') || 'Nenhuma selecionada'}`, 10, 40);
doc.text(`Estilo: ${formData.style || 'Não especificado'}`, 10, 50);
doc.text(`Público-alvo: ${formData.audience || 'Não especificado'}`, 10, 60);
doc.text(`Prazo: ${formData.deadline || 'Não especificado'}`, 10, 70);
doc.text(`Orçamento: ${formData.budget || 'Não especificado'}`, 10, 80);
doc.text(`Referências: ${formData.references || 'Nenhuma'}`, 10, 90);

const pdfBlob = doc.output('blob');

// Teste abrindo o PDF no navegador
const blobUrl = URL.createObjectURL(pdfBlob);
window.open(blobUrl);

const formDataToSend = new FormData();
formDataToSend.append('pdf', pdfBlob, 'formulario.pdf'); // Adiciona o nome do arquivo
formDataToSend.append('email', formData.email);




  return (
    <div className="container">
      <Header />
      <h1>Formulário para Criação de Sites</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="objective">Qual o objetivo do site?</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="informativo">Site Informativo</option>
            <option value="ecommerce">Loja Virtual</option>
            <option value="portfolio">Portfólio</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: 'home', label: 'Página Inicial' },
              { value: 'about', label: 'Sobre' },
              { value: 'contact', label: 'Contato' },
              { value: 'store', label: 'Loja Virtual' },
              { value: 'blog', label: 'Blog' }
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="pages"
                  value={value}
                  checked={formData.pages.includes(value)}
                  onChange={handleInputChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p>Funcionalidades desejadas:</p>
          <div>
            {[
              { value: 'form', label: 'Formulário de Contato' },
              { value: 'chat', label: 'Chat' },
              { value: 'login', label: 'Login' },
              { value: 'social', label: 'Integração com Redes Sociais' }
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="features"
                  value={value}
                  checked={formData.features.includes(value)}
                  onChange={handleInputChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="style">Qual o estilo desejado?</label>
          <input
            type="text"
            id="style"
            name="style"
            placeholder="Ex.: Minimalista, moderno"
            required
            value={formData.style}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="audience">Público-alvo:</label>
          <input
            type="text"
            id="audience"
            name="audience"
            placeholder="Ex.: Jovens, empresas, profissionais"
            required
            value={formData.audience}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="deadline">Prazo para entrega:</label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            placeholder="Ex.: 2 semanas"
            required
            value={formData.deadline}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="budget">Orçamento disponível:</label>
          <input
            type="number"
            id="budget"
            name="budget"
            placeholder="Ex.: 5000"
            required
            value={formData.budget}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="references">Referências de sites:</label>
          <textarea
            id="references"
            name="references"
            rows="4"
            placeholder="Links de sites que inspiram você"
            value={formData.references}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="email">E-mail para envio:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Seu e-mail"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
