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
        <div>
          <p>Serviços de Design</p>
          <div>
            {[
              { value: 'home', label: 'Logotipo' },
              { value: 'about', label: 'Icons' },
              { value: 'contact', label: 'Banners' },
              { value: 'outras', label: 'Outros' }
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
        <div>
          <p>Serviços de Design</p>
          <div>
            {[
              { value: 'home', label: 'Logotipo' },
              { value: 'about', label: 'Icons' },
              { value: 'contact', label: 'Banners' },
              { value: 'outras', label: 'Outros' }
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
          <label htmlFor="objective">Integração com meios de pagamento</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value='integracaoPg'>Sim</option>
            <option value='semIntPg'>Não</option>    
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="objective">Avaliação de produtos</label>
          <select 
            id="objective" 
            name="objective" 
            required 
            value={formData.objective}
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
              <button type="submit">Enviar</button>
              <h5>Ou</h5>
              <button type="submit">Agendar reunião</button>
            </form>
          </div>
        );
     /*  case 'contacto':
        return (
          <FormContacto />
        );
      default: */
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
            Site informativo
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
            Contacto
          </button> */}
        </div>
      </div>
      {renderForm()}
    </div>
  );
}
