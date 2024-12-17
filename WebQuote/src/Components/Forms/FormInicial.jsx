import React, { useState } from 'react';
import './form.css';
import FormContacto from './FormContacto';
import { jsPDF } from 'jspdf';

const generatePDF = (data) => {
  const doc = new jsPDF();
  doc.text('Dados do Formulário', 10, 10);
  let yPosition = 20;
  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 10, yPosition);
    yPosition += 10;
  });
  return doc;
};

const downloadPDF = (data) => {
  const doc = generatePDF(data);
  doc.save('formulario_dados.pdf');
};

export default function FormInicial() {
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    blogTitle:'',
    blogDescription:'',
    pages: [],
    websiteObjective: [],
    logotipo:[],
    acaoVisitantes:[],
    redesSociais:[],
    loginOuCadastro:[],
    formContacto:[],
    manutencao:[],
    atualizacao:[],
    linguas: [],





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
  downloadPDF(formData);
};

  const renderForm = () => {
    switch (selectedForm) {
      case 'blog':
  return (
    <div className="form-container">
      <h2>Formulário para Blog</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="websiteObjective">Website novo ou modernização?</label>
          <select 
            id="websiteObjective" 
            name="websiteObjective" 
            required 
            value={formData.websiteObjective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoSite'>Novo</option>
            <option value='modernizacao'>Modernização</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="logotipo">Logotipo</label>
          <select 
            id="logotipo" 
            name="logotipo" 
            required 
            value={formData.logotipo}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoLogotipo'>Criação de um novo</option>
            <option value='manterLogotipo'>Manter atual</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="acaoVisitantes">Ação desejada dos visitantes</label>
          <select 
            id="acaoVisitantes" 
            name="acaoVisitantes" 
            required 
            value={formData.acaoVisitantes}
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
          <label htmlFor="redesSociais">Integração com redes sociais</label>
          <select 
            id="redesSociais" 
            name="redesSociais" 
            required 
            value={formData.redesSociais}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='redesSociais'>Sim</option>
            <option value='semintegracao'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="loginOuCadastro">Área de Login e cadastro</label>
          <select 
            id="loginOuCadastro" 
            name="loginOuCadastro" 
            required 
            value={formData.loginOuCadastro}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='comlogin'>Sim</option>
            <option value='semLogin'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="formContacto">Formulário de contacto</label>
          <select 
            id="formContacto" 
            name="formContacto" 
            required 
            value={formData.formContacto}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='comformulario'>Sim</option>
            <option value='semFormulario'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="manutencao">Período de manutenção</label>
          <select 
            id="manutencao" 
            name="manutencao" 
            required 
            value={formData.manutencao}
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
          <label htmlFor="atualizacao">Atualização</label>
          <select 
            id="atualizacao" 
            name="atualizacao" 
            required 
            value={formData.atualizacao}
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
                  name="linguas"
                  value={value}
                  checked={formData.linguas.includes(value)}
                  onChange={handleInputChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <br />
        <label>Título do Blog:</label>
<input 
  type="text" 
  id="blogTitle" 
  name="blogTitle" 
  placeholder="Digite o título"
  value={formData.blogTitle || ''} 
  onChange={handleInputChange} 
/>
<br />
<br />
<label>Descrição:</label>
<textarea 
  id="blogDescription" 
  name="blogDescription" 
  placeholder="Digite a descrição"
  value={formData.blogDescription || ''} 
  onChange={handleInputChange} 
/>
<br />

        <button type="submit">Enviar</button>
        <button type="button" onClick={() => downloadPDF(formData)}>
          Download PDF
        </button>
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
