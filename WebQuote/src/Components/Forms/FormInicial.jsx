import React, { useState } from 'react';
import './form.css';
import { jsPDF } from 'jspdf';
export default function FormInicial() {

const PRICE_MAP = {
  novoSite: 500,
  modernizacao: 300,
  //Paginas
  home: 100,
  about: 100,
  contact: 100,
  blog: 100,
  outras: 100,
  //Servicos de Design
  Logotipo: 100,
  Icons: 100,
  Banners: 100,
  outras: 100,
  //Manutençao
  umAno: 100,
  doisAnos: 100,
  tresAnos: 100,
  //Atualizaçao
  semanal: 100,
  mensal: 100,
  trimestral: 100,
}
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
    
    let total = 0;

    //custo Website
    total += PRICE_MAP[formData.objective] || 0;

    //Custo de paginas
    formData.pages.forEach(page => {
      total += PRICE_MAP[page] || 0;
    });

    //Custo de manutençao
    if (formData.maintenance) {
      total += PRICE_MAP[formData.maintenance] || 0;
    }
    
    //Conteudo PDF
    const doc = new jsPDF();
    //Conteudo
    doc.setFontSize(20);
    doc.text('Website Quote', 10,10);

    doc.setFontSize(12);
    doc.text('Quote Details: ',20,40);
    doc.text('Objective: '+(formData.objective === 'novoSite' ? 'Novo Website' : 'Modernização')  ,20,50);
    doc.text('Pages: '+(formData.pages.length > 0 ? formData.pages.join(', ') : 'Não selecionado'),20,60);
    doc.text('Maintenance: '+(formData.maintenance ? formData.maintenance : 'Não selecionado'),20,70);
    doc.text('Total: '+(total > 0 ? total : 'Não selecionado'),20,80);

    doc.setFontSize(16);
    doc.text('Total amount: '+total,20,90);
    doc.save('website_quote.pdf');
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'siteInformativo':
        return (
          <div className="form-container">
            <h2>Formulário para Site informativo</h2>
            <form>
            <label>Nome:</label>
              <input type="text" placeholder="Digite o nome e apelido" required/>
              <br />
              <br />
              <label>Telemóvel:</label>
              <input type='text' placeholder="Digite o contacto" required/>
              <br />
              <br />
              <label>Email:</label>
              <input type='email' placeholder="Digite o email" required />
              <br />
            <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: 'home', label: 'Página Inicial' },
              { value: 'about', label: 'Sobre' },
              { value: 'contact', label: 'Contato' },
              { value: 'blog', label: 'Blog' },
              { value: 'outras', label: 'Outras' }
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
          <label htmlFor="siteNovo">Website novo ou modernização?</label>
          <select 
            id="siteNovo" 
            name="siteNovo" 
            required 
            value={formData.siteNovo}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoSite'>Novo</option>
            <option value='modernizacao'>Modernização</option>
          </select>
        </div>
        <div>
        <p>Serviços de Design</p>
          <div>
            {[
              { value: 'logotipo', label: 'Logotipo' },
              { value: 'icons', label: 'Icons' },
              { value: 'banners', label: 'Banners' },
              { value: 'outrosDes', label: 'Outros' }
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
          <label htmlFor="acaoVisit">Ação desejada dos visitantes</label>
          <select 
            id="acaoVisit" 
            name="acaoVisit" 
            required 
            value={formData.acaoVisit}
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
          <label htmlFor="integracao">Integração com redes sociais</label>
          <select 
            id="integracao" 
            name="integracao" 
            required 
            value={formData.integracao}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='redesSociais'>Sim</option>
            <option value='semintegracao'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="areaLogin">Área de Login e cadastro</label>
          <select 
            id="areaLogin" 
            name="areaLogin" 
            required 
            value={formData.areaLogin}
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
          <label htmlFor="perManutencao">Período de manutenção</label>
          <select 
            id="perManutencao" 
            name="perManutencao" 
            required 
            value={formData.perManutencao}
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
              <button type="submit">Enviar</button>
              <h5>Ou</h5>
              <button type="submit">Agendar reunião</button>
            </form>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="form-container">
            <h2>Formulário para E-commerce</h2>
            <form>
            <label>Nome:</label>
              <input type="text" placeholder="Digite o nome e apelido" required/>
              <br />
              <br />
              <label>Telemóvel:</label>
              <input type='text' placeholder="Digite o contacto" required/>
              <br />
              <br />
              <label>Email:</label>
              <input type='email' placeholder="Digite o email" required />
              <br />
            <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: 'home', label: 'Página Inicial' },
              { value: 'about', label: 'Sobre' },
              { value: 'contact', label: 'Contato' },
              { value: 'loja', label: 'Loja' },
              { value: 'usuario', label: 'Conta do usuário' },
              { value: 'politica', label: 'Política de devoluções' },
              { value: 'outras', label: 'Outras' }
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
        <label htmlFor="siteNovo">Website novo ou modernização?</label>
          <select 
            id="siteNovo" 
            name="siteNovo" 
            required 
            value={formData.siteNovo}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='novoSite'>Novo</option>
            <option value='modernizacao'>Modernização</option>
          </select>
        </div>
        <div>
          <p>Serviços de Design</p>
          <div>
            {[
               { value: 'logotipo', label: 'Logotipo' },
               { value: 'icons', label: 'Icons' },
               { value: 'banners', label: 'Banners' },
               { value: 'outrosDes', label: 'Outros' }
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
          <label htmlFor="objective">Integração com redes sociais</label>
          <select 
            id="integracao" 
            name="integracao" 
            required 
            value={formData.integracao}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='redesSociais'>Sim</option>
            <option value='semintegracao'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="integracaoPg">Integração com meios de pagamento</label>
          <select 
            id="integracaoPg" 
            name="integracaoPg" 
            required 
            value={formData.integracaoPg}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='integracaoPg'>Sim</option>
            <option value='semIntPg'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="avaProd">Avaliação de produtos</label>
          <select 
            id="avaProd" 
            name="avaProd" 
            required 
            value={formData.avaProd}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='avaliacaoProdutos'>Sim</option>
            <option value='semAvaProd'>Não</option>    
          </select>
        </div>
        <div>
          <p>Suporte ao cliente</p>
          <div>
            {[
              { value: 'telefone', label: 'Telefone' },
              { value: 'email', label: 'Email' },
              { value: 'chat', label: 'Chat online' },
              { value: 'outros', label: 'Outros' }
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
          <label htmlFor="maintenance">Período de manutenção</label>
          <select 
            id="maintenance" 
            name="maintenance" 
            required 
            value={formData.maintenance}
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
              <button type="submit">Enviar</button>
              <h5>Ou</h5>
              <button type="submit">Agendar reunião</button>
            </form>
          </div>
        );
      /* case 'contacto':
        return (
          <FormContacto />
        );
      default:
        return null; */
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
            onClick={() => setSelectedForm('siteInformativo')}
          >
            Site Informativo
          </button>
          <button
            type="button"
            className="objective-button"
            onClick={() => setSelectedForm('ecommerce')}
          >
            E-COMMERCE
          </button>
          {/* <button
            type="button"
            className="objective-button"
            onClick={() => setSelectedForm('contacto')}
          >
            CONTACTO
          </button> */}
        </div>
      </div>
      {renderForm()}
    </div>
  );
}
