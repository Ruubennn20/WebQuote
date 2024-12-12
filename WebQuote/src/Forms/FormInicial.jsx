import React, { useState } from 'react';
  import { useNavigate} from 'react-router-dom';
  import './form.css';
  
  export default function FormInicial() {

  
    const [formData, setFormData] = useState({
      objective: ''
    });
    const navigate = useNavigate();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Roteamento baseado na seleção
      switch(formData.objective) {
        case 'blog':
          navigate('/formBlog');
          break;
        case 'ecommerce':
          navigate('/formEcommerce');
          break;
        default:
          // Caso nenhuma opção seja selecionada
          alert('Por favor, selecione um objetivo');
      }
    };
  
    return (
      <div className="container">
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
              <option value="blog">Blog</option>
              <option value="ecommerce">E-COMMERCE</option>
            </select>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }