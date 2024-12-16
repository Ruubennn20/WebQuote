
import React, { useState } from 'react';
import './form.css'
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
    references: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: e.target.checked
          ? [...(prevData[name] || []), value]
          : (prevData[name] || []).filter(item => item !== value)
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    
  };

  return (
    <div className="container">
      <Header/>
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

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}