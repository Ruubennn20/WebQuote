import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeaderForm from '../Header/HeaderForm';
import FormInfoInicial from './FormInfoInicial';
import FormBlog from './FormsFinais/FormBlog';
import FormAppLogistica from './FormsFinais/FormAppLogistica';
import FormCRM from './FormsFinais/FormCRM';
import FormECommerce from './FormsFinais/FormECommerce';
import FormAppELearning from './FormsFinais/FormAppELearning';
import FormAppRedeSocial from './FormsFinais/FormAppRedeSocial';


export default function FormMainComponente() {
  const [formData, setFormData] = useState({
    nome: '',
    contacto: '',
    email: '',
    formType: '',
    category: '',
    type: ''
  });

  const [showSelectedForm, setShowSelectedForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Map form types to their components
  const formComponents = {
    blogForm: FormBlog,
    appLogisticaForm: FormAppLogistica,
    crmForm: FormCRM,
    eComerceForm: FormECommerce,
    appELearningForm: FormAppELearning,
    appRedeSocialForm: FormAppRedeSocial,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (formData.nome && formData.email && formData.contacto) {
      setShowSelectedForm(true);
      setCurrentStep(2);
    }
  };

  const handleStepBack = () => {
    setShowSelectedForm(false);
    setCurrentStep(1);
  };

  const renderForm = () => {
    if (!showSelectedForm) {
      return (
        <FormInfoInicial 
          formData={formData}
          handleInputChange={handleInputChange}
          handleNextStep={handleNextStep}
        />
      );
    }

    const SelectedForm = formComponents[formData.formType];
    
    if (!SelectedForm) {
      console.error('No form component found for type:', formData.formType);
      return null;
    }

    return (
      <SelectedForm 
        formData={formData}
        setFormData={setFormData}
        initialStep={currentStep}
        onStepBack={handleStepBack}
      />
    );
  };

  return (
    <>
      <HeaderForm currentStep={currentStep} />
      <div className="container-form">
        <h2>Solução de Orçamento WebQuoteL</h2>
        <AnimatePresence mode="wait" initial={false}>
          {renderForm()}
        </AnimatePresence>
      </div>
    </>
  );
}