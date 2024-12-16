import React, { useState } from 'react';
import './form.css';
import FormContacto from './FormContacto';
export default function FormInicial() {
  const [selectedForm, setSelectedForm] = useState(null);
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

  const renderForm = () => {
    switch (selectedForm) {
      case 'blog':
        return (
          <div className="form-container">
            <h2>Formulário para Blog</h2>
            <form>
            <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: 'home', label: 'Página Inicial' },
              { value: 'about', label: 'Sobre' },
              { value: 'contact', label: 'Contato' },
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
        <br />
        <div>
          <label htmlFor="objective">Website novo ou modernização?</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoSite'>Novo</option>
            <option value='modernizacao'>Modernização</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Logotipo</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoLogotipo'>Criação de um novo</option>
            <option value='manterLogotipo'>Manter atual</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Ação desejada dos visitantes</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='consulta'>Somente consulta</option>
            <option value='comentarios'>Deixar comentários</option>
            <option value="outrasacoes">Mais ações</option>      
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Integração com redes sociais</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='redesSociais'>Sim</option>
            <option value='semintegracao'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Área de Login e cadastro</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='comlogin'>Sim</option>
            <option value='semLogin'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Formulário de contacto</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='comformulario'>Sim</option>
            <option value='semFormulario'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Período de manutenção</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='umAno'>Um ano</option>
            <option value='doisAnos'>Dois anos</option> 
            <option value='tresAnos'>Três anos</option>   
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Atualização</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='semanal'>Semanal</option>
            <option value='mensal'>Mensal</option>  
            <option value='trimestral'>Trimestral</option>   
          </select>
        </div>
        <div>      
          <p>Idiomas do Website</p>
          <div>
            {[
              { value: 'portugues', label: 'Português' },
              { value: 'ingles', label: 'Inglês' },
              { value: 'frances', label: 'Francês' },
              { value: 'espanhol', label: 'Espanhol' },
              { value: 'outro', label: 'Outro' }
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
        <br />
              <label>Título do Blog:</label>
              <input type="text" placeholder="Digite o título" />
              <br />
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
