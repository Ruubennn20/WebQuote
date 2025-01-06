import React, { useState } from 'react';
import { motion } from "framer-motion";

const FormInfoInicial = ({ formData, handleInputChange, handleNextStep }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const categoryOptions = {
    websites: [
      { value: 'blog', label: 'Blog', formType: 'blogForm' },
      { value: 'ecommerce', label: 'E-commerce', formType: 'ecommerceForm' },
      { value: 'crm', label: 'CRM', formType: 'crmForm' }
    ],
    apps: [
      { value: 'logistics', label: 'Entregas e Logística', formType: 'logisticsForm' },
      { value: 'social', label: 'Rede Social', formType: 'socialForm' },
      { value: 'elearning', label: 'E-Learning', formType: 'elearningForm' }
    ]
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedType('');
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    const selectedOption = categoryOptions[selectedCategory]
      .find(option => option.value === e.target.value);
    
    if (selectedOption) {
      handleInputChange({
        target: {
          name: 'formType',
          value: selectedOption.formType
        }
      });
    }
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={{
        enter: { opacity: 0, x: 0, y: 20 },
        center: { zIndex: 1, x: 0, y: 0, opacity: 1 },
        exit: { zIndex: 0, opacity: 0, x: 0, y: -20 }
      }}
    >
      <h3>Informações Básicas</h3>
      <div className="select-container">
        <label>Categoria: </label>
        <select 
          value={selectedCategory} 
          onChange={handleCategoryChange}
          name="category"
        >
          <option value="">Selecione uma categoria</option>
          <option value="websites">Websites</option>
          <option value="apps">Apps Mobile</option>
        </select>

        {selectedCategory && (
          <>
            <label>{selectedCategory === 'websites' ? 'Tipo de Website:' : 'Tipo de App:'}</label>
            <select
              value={selectedType}
              onChange={handleTypeChange}
              name="type"
            >
              <option value="">Selecione um tipo</option>
              {categoryOptions[selectedCategory].map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {selectedType && (
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            name="nome"
            placeholder="Digite o nome e apelido" 
            defaultValue={formData.nome || ''}
            onBlur={handleInputChange}
          />
          <br />
          <br />
          <label>Telemóvel:</label>
          <input 
            type="text" 
            name="contacto"
            placeholder="Digite o contacto" 
            defaultValue={formData.contacto || ''}
            onBlur={handleInputChange}
          />
          <br />
          <br />
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            placeholder="Digite o email" 
            defaultValue={formData.email || ''}
            onBlur={handleInputChange}
          />
        </div>
      )}

      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNextStep}
          disabled={!formData.nome || !formData.email || !formData.contacto}
        >
          Próximo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FormInfoInicial;