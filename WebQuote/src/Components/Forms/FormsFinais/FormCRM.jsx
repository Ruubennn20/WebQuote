import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { jsPDFTable } from "jspdf-autotable";
import "../formsFinal.css";
import logo from "../../../assets/logoPequeno.png";
import HeaderForm from "../../Header/HeaderForm";

export default function FormCRM({ formData: initialFormData, setFormData: setInitialFormData, initialStep, onStepBack }) {
  const PRICE_MAP = {
   // Core CRM Features (base pages)
    dashboardPage: 200,     // Main dashboard
    contactsPage: 160,      // Contact management
    leadsPage: 160,         // Lead management
    tasksPage: 160,         // Task/Calendar management
    reportsPage: 200,       // Analytics & reporting
    documentsPage: 160,     // Document management
    
    // Type of system
    novoSite: 0,
    modernizacao: 0,
    
    // Advanced Features
    automationFeature: 200,    // Workflow automation 
    calendarIntegration: 120,  // Calendar integration
    fileStorage: 100,          // Document storage system
    
    // Analytics Features
    basicAnalytics: 160,       // Basic reporting
    advancedAnalytics: 300,    // Advanced analytics & forecasting
    customReports: 200,        // Custom report builder
    
    // Integration Features
    emailProvider: 140,        // Email service integration
    thirdPartyApps: 180,      // Third-party app integration
    apiAccess: 250,  
           // API access for custom integration
    // Languages
    portugues: 10,
    ingles: 20,
    frances: 20,
    espanhol: 20,
    // Maintenance
    umAno: 300,
    doisAnos: 500,
    tresAnos: 700,
    
    // Updates
    semanal: 400,
    mensal: 250,
    trimestral: 150,
    
    //Suporte
    suporteEmpresa: 100,
    
  };
/*   const [selectedForm, setSelectedForm] = useState(null); */
  const [formData, setFormData] = useState({
    nome: '',
    contacto: '',
    email: '',
    objective: "",
    pages: [],
    advancedFeatures: [],
    analyticsFeatures: [],
    integrations: [],
    maintenancePeriod: "",
    updateFrequency: "",
    languages: [],
    budget: "",
    references: "",
  });
  const [step, setStep] = useState(initialStep || 2);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
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

    // Generate order number once
    const orderNumber = `WQ${Date.now().toString().slice(-6)}`;

    // Validation checks
    const validationErrors = [];

    // Check objective (website type)
    if (!formData.objective) {
      validationErrors.push("Por favor selecione se deseja um website novo ou modernização");
    }

    // Check pages (at least one)
    if (!formData.pages.length) {
      validationErrors.push("Por favor selecione pelo menos uma página");
    }

    // Check design services (at least one)
    if (!formData.advancedFeatures.length) {
      validationErrors.push("Por favor selecione pelo menos um serviço de design");
    }
    if(!formData.analyticsFeatures.length){
      validationErrors.push("Por favor selecione pelo menos um serviço de análise");
    }
    if(!formData.integrations.length){
      validationErrors.push("Por favor selecione pelo menos uma integração");
    }

    if (!formData.companySupport) {
      validationErrors.push("Por favor selecione a opção de suporte à empresa");
    }

    // Check languages (at least one)
    if (!formData.languages.length) {
      validationErrors.push("Por favor selecione pelo menos um idioma");
    }

    // Check maintenance and update frequency
    if (!formData.maintenance) {
      validationErrors.push("Por favor selecione um período de manutenção");
    }

    if (!formData.updateFrequency) {
      validationErrors.push("Por favor selecione uma frequência de atualização");
    }

    // If there are validation errors, show them and stop form submission
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

    let finalTotal = 0;

    // Pages cost
    formData.pages.forEach(page => {
      finalTotal += PRICE_MAP[page] || 0;
    });

    // Design Services
    formData.advancedFeatures.forEach(service => {
      finalTotal += PRICE_MAP[service] || 0;
    });

    // Analytics Services
    formData.analyticsFeatures.forEach(analy => {
      finalTotal += PRICE_MAP[analy] || 0;
    });

    // Integrations Services
    formData.integrations.forEach(integ => {
      finalTotal += PRICE_MAP[integ] || 0;
    });

    // Customer Support
    if (formData.companySupport === "suporteYes") {
      finalTotal += PRICE_MAP.suporteEmpresa;
    }

    // Cálculo do custo do website
      finalTotal += PRICE_MAP[formData.objective] || 0;
  
    // Cálculo do custo das páginas
    formData.pages.forEach((page) => {
      finalTotal += PRICE_MAP[page] || 0;
    });
  
    // Cálculo do custo de manutenção
    if (formData.maintenance) {
      finalTotal += PRICE_MAP[formData.maintenance];
    }

    // Update Frequency
    if (formData.updateFrequency) {
      finalTotal += PRICE_MAP[formData.updateFrequency];
    }

    // Languages
    formData.languages.forEach(lang => {
      finalTotal += PRICE_MAP[lang] || 0;
    });


    const doc = new jsPDF();
    
    doc.addImage(logo, 'JPEG', 10, -4, 40, 30);
    doc.setFontSize(10);
    doc.text('WEBQUOTE', 150, 10);
    doc.text('Orçamento Website E-Commerce', 150, 15);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 22, 200, 22);
    
    // Client Information
    doc.setFont('Helvetica', 'bold');
    doc.text('Informação do cliente', 13, 27);
    doc.text('Nome:', 13, 31);
    doc.text('Contacto:', 13, 35);
    doc.text('Email:', 13, 39);
    
    // Calculate the width of the bold labels to position the values
    const nomeWidth = doc.getTextWidth('Nome:');
    const contactoWidth = doc.getTextWidth('Contacto:');
    const emailWidth = doc.getTextWidth('Email:');

    // Switch to normal font for the values
    doc.setFont('Helvetica', 'normal');
    doc.text(initialFormData.nome || '', 13 + nomeWidth + 2, 31);
    doc.text(initialFormData.contacto || '', 13 + contactoWidth + 2, 35);
    doc.text(initialFormData.email || '', 13 + emailWidth + 2, 39);
    
    // Quote details
    doc.setFont('Helvetica', 'bold');
    doc.text('Fatura Num:    ', 130, 27);
    doc.text('Data:    ', 130, 31);
    doc.setFont('Helvetica', 'normal');
    doc.text(orderNumber, 155, 27);
    doc.text(new Date().toLocaleDateString(), 155, 31);

    // Tabela para o tipo de website novo ou modernizar
    doc.autoTable({
      startY: 45,
      head: [['Tipo de serviço', "", '', '']],
      body: [[
        "Website",
        formData.objective === "novoSite" ? "Desenvolvimento de um website novo" : 
        formData.objective === "modernizacao" ? "Modernização de um website existente" : "",
        "",
        "",
        formData.objective ? PRICE_MAP[formData.objective] + " €" : "0 €"
      ]],
      
      headStyles: {
        fillColor: [65, 105, 225],
        textColor: 255,
        fontSize: 10,
      },
      footStyles: {
        fillColor: [65, 105, 225],
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    // Pages Table
    let finalY = doc.lastAutoTable.finalY;

    //Tabela para as páginas
        const pagesTotal = formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0);
        doc.autoTable({
            startY: finalY + 10,
            head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
            body: [
                ["Páginas: ", "", "", "30€ / Hora", "-"],
                ...formData.pages.map(page => {
                    const pageLabel = {
                        dashboardPage: "Dashboard Principal",
                        contactsPage: "Gestão de Contactos",
                        leadsPage: "Gestão de Leads",
                        tasksPage: "Gestão de Tarefas",
                        reportsPage: "Relatórios e Análises",
                        documentsPage: "Gestão documental",
                    }[page];

                    // Set hours based on page type
                    const hours = page === 'documentsPage' ? "16" : "8";
                    return ["", pageLabel, hours, (PRICE_MAP[page] || 0) + " €"];
                })
            ],
            foot: [[
                '',
                '',
                'Subtotal: ',
                `${pagesTotal} €` 
            ]],
            headStyles: {
                fillColor: [65, 105, 225],
                textColor: 255,
                fontSize: 10,
            },
            footStyles: {
              fillColor: [65, 105, 225],
            },
            styles: { fontSize: 10, cellPadding: 3 },
            theme: 'grid',
        });

    // Tabela para os serviços de design
    finalY = doc.lastAutoTable.finalY;
      console.log("Serviços Avançados Selected:", formData.advancedFeatures);
      const advancedTotal = formData.advancedFeatures.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
      body: [
        ["Serviços Avançados", "", "", "10€ / Hora", "-"],
        ...formData.advancedFeatures.map(service => {
        const advancedLabel = {
          automationFeature: "Automação de Fluxos de Trabalho",
          calendarIntegration: "Integração com Calendário",
          fileStorage: "Sistema de Armazenamento de Documentos",
        }[service];
        return ["",advancedLabel, "12", PRICE_MAP[service] + " €"];
      }),
    ],
      foot: [[
        '',
        '',
        'Subtotal',
        `${advancedTotal} €`
      ]],
      headStyles: {
        fillColor: [65, 105, 225],
        textColor: 255,
        fontSize: 10,
      },
      footStyles: {
        fillColor: [65, 105, 225],
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    finalY = doc.lastAutoTable.finalY;
      const analyticsTotal = formData.analyticsFeatures.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
     
      body:[["Recursos de Análises", "", "", "20€ / Hora", "-"],
      ...formData.analyticsFeatures.map(analy => {
        const analyticsLabel = {
          basicAnalytics: "Análise Básica",
          advancedAnalytics: "Análise Avançada",
          customReports: "Relatórios Personalizados",
        }[analy];
        // Each language takes 0.5 hour for portugues and 1 hour for others
        const hours = analy === 'basicAnalytics' ? "0.5" : "1";

        return ["", analyticsLabel, hours, PRICE_MAP[analy] + "€" ];
      }),
    ],
      foot: [[
        '',
        '',
        'Subtotal',
        `${analyticsTotal} €`
      ]],
      headStyles: {
        fillColor: [65, 105, 225],
        textColor: 255,
        fontSize: 10,
      },
      footStyles: {
        fillColor: [65, 105, 225],
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    finalY = doc.lastAutoTable.finalY;
    const integrationsTotal = formData.integrations.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0);
    doc.autoTable({
    startY: finalY + 10,
    head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
   
    body:[["Integrações", "", "", "20€ / Hora", "-"],
    ...formData.integrations.map(integ => {
      const integLabel = {
        emailProvider: "Integração com Provedor de Email",
        thirdPartyApps: "Integração com Aplicações Terceiros",
        apiAccess: "Acesso a APIs Externas",
      }[integ];
      return ["", integLabel, "10", PRICE_MAP[integ] + "€" ];
    }),
  ],
    foot: [[
      '',
      '',
      'Subtotal',
      `${integrationsTotal} €`
    ]],
    headStyles: {
      fillColor: [65, 105, 225],
      textColor: 255,
      fontSize: 10,
    },
    footStyles: {
      fillColor: [65, 105, 225],
    },
    styles: { fontSize: 10, cellPadding: 3 },
    theme: 'grid',
  });

    // Languages Table
    finalY = doc.lastAutoTable.finalY;
      const languagesTotal = formData.languages.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
     
      body:[["Linguagem", "", "", "20€ / Hora", "-"],
      ...formData.languages.map(lang => {
        const langLabel = {
          portugues: "Português",
          ingles: "Inglês",
          frances: "Francês",
          espanhol: "Espanhol"
        }[lang];
        // Each language takes 0.5 hour for portugues and 1 hour for others
        const hours = lang === 'portugues' ? "0.5" : "1";

        return ["", langLabel, hours, PRICE_MAP[lang] + "€" ];
      }),
    ],
      foot: [[
        '',
        '',
        'Subtotal',
        `${languagesTotal} €`
      ]],
      headStyles: {
        fillColor: [65, 105, 225],
        textColor: 255,
        fontSize: 10,
      },
      footStyles: {
        fillColor: [65, 105, 225],
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

  finalY = doc.lastAutoTable.finalY;
  const finalDetails = [];
  // Check for MaintenanceormData.maintenance) {
   finalDetails.push(["Manutenção", {
     umAno: "1 Ano de Manutenção",
     doisAnos: "2 Anos de Manutenção",
     tresAnos: "3 Anos de Manutenção"
   }[formData.maintenance], "1", `${PRICE_MAP[formData.maintenance]} €`]);

   finalDetails.push(["Suporte à empresa", 
     formData.companySupport === "suporteYes" ? "Com Suporte Incluído" : "Sem Suporte Incluído",
     "1", 
     `${formData.companySupport === "suporteYes" ? PRICE_MAP.suporteEmpresa : 0} €`
   ]);

   // Check for Update Frequency
   finalDetails.push(["Atualizações", {
     semanal: "Atualizações Semanais",
     mensal: "Atualizações Mensais",
     trimestral: "Atualizações Trimestrais"
   }[formData.updateFrequency], "1", `${PRICE_MAP[formData.updateFrequency]} €`]);
  
  // Draw the Final Table
  doc.autoTable({
   startY: finalY + 10,
   head: [['Tipo de serviço', "", ' ', 'Preço (€)']],
   body: [["Pós venda ", "", " ", "Unitário €", "-"],
   ...finalDetails.length > 0 ? finalDetails : [["Sem manutenção ou frequência de atualização selecionada.", "", "", "", "Subtotal: 0 €"]],
  ],
   foot: [[
     '',
     '',
     'Subtotal',
     `${(
        (PRICE_MAP[formData.maintenance] || 0) + 
        (PRICE_MAP[formData.updateFrequency] || 0)
    ).toFixed(2)} €`
   ]],
   headStyles: {
     fillColor: [65, 105, 225],
     textColor: 255,
     fontSize: 10,
   },
   footStyles: {
    fillColor: [65, 105, 225],
  },
   styles: { fontSize: 10, cellPadding: 3 },
   theme: 'grid',
  })

    // Final Total Table
    finalY = doc.lastAutoTable.finalY;
    const finalTotalPreco = (
      // Website Type multiplier
      (
        // Pages cost
        formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0) +
        // Advanced Features
        formData.advancedFeatures.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0) +
        // Analytics Features
        formData.analyticsFeatures.reduce((sum, analy) => sum + (PRICE_MAP[analy] || 0), 0) +
        // Integration Features
        formData.integrations.reduce((sum, integ) => sum + (PRICE_MAP[integ] || 0), 0) +
        // Languages
        formData.languages.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0) +
        // Maintenance
        (PRICE_MAP[formData.maintenance] || 0) +
        // Update Frequency
        (PRICE_MAP[formData.updateFrequency] || 0)
      ) 
    );

    doc.autoTable({
      startY: finalY + 10,
      body: [[
        '',
        '',
        'Total Final: ',
        `${finalTotalPreco.toFixed(2)} €`
      ]],
      styles: { 
        fontSize: 10, 
        cellPadding: 3,
        fontStyle: 'bold'
      },
      theme: 'grid',
    });
    
    // Add footer with number of pgaes
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10
      );
    }
    

// ... resto do seu código que popula o PDF ...

// Salva o PDF localmente (opcional)
doc.save("website_quotation.pdf");

// Converte o PDF em Blob para enviar ao backend
const pdfBlob = doc.output("blob");

// Cria um FormData para enviar o PDF ao servidor
const formDataEmail = new FormData();
formDataEmail.append("pdf", pdfBlob, "website_quotation.pdf");

// Anexe também o e-mail do utilizador, que está no formData.email
formDataEmail.append("email", initialFormData.email);

// Agora chama a rota do backend que envia e-mail
try {
  const response = await fetch("http://localhost:3000/send-email", {
    method: "POST",
    body: formDataEmail,
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar e-mail.");
  }

  alert("PDF enviado por e-mail com sucesso!");
} catch (error) {
  console.error("Erro ao enviar o PDF por e-mail:", error);
  alert("Falha ao enviar o e-mail.");
}


  
    // Captura dos dados do formulário
    const dadosOrcamento = {
      orderNumber: orderNumber,
      informacoesCliente: {
        nome: initialFormData.nome,
        telefone: initialFormData.contacto,
        email: initialFormData.email
      },
      detalhesWebsite: {
        tipoWebsite: formData.objective === "novoSite" ? "Novo Sistema CRM" : "Modernização CRM",
        paginas: formData.pages.map(page => ({
          dashboardPage: "Dashboard Principal",
          contactsPage: "Gestão de Contactos",
          leadsPage: "Gestão de Leads",
          tasksPage: "Gestão de Tarefas",
          reportsPage: "Relatórios e Análises",
          documentsPage: "Gestão documental"
        }[page])),
        recursosAvancados: formData.advancedFeatures.map(feature => ({
          automationFeature: "Automação de Workflows",
          calendarIntegration: "Integração de Calendário",
          fileStorage: "Sistema de Armazenamento"
        }[feature])),
        analises: formData.analyticsFeatures.map(analytic => ({
          basicAnalytics: "Análises Básicas",
          advancedAnalytics: "Análises Avançadas",
          customReports: "Relatórios Personalizados"
        }[analytic])),
        integracoes: formData.integrations.map(integration => ({
          emailProvider: "Integração de Email",
          thirdPartyApps: "Integração de Aplicações Terceiras",
          apiAccess: "Acesso à API"
        }[integration])),
        suporteCliente: formData.companySupport === "suporteYes" ? "Sim" : "Não",
        periodoManutencao: {
          umAno: "1 Ano",
          doisAnos: "2 Anos",
          tresAnos: "3 Anos"
        }[formData.maintenance],
        frequenciaAtualizacao: {
          semanal: "Semanal",
          mensal: "Mensal",
          trimestral: "Trimestral"
        }[formData.updateFrequency],
        idiomas: formData.languages.map(lang => ({
          portugues: "Português",
          ingles: "Inglês",
          frances: "Francês",
          espanhol: "Espanhol"
        }[lang]))
      },
      orcamento: {
        valorTotal: finalTotalPreco.toFixed(2),
        moeda: "€"
      },
      dataSubmissao: new Date().toISOString(),
      status: "Aguardando processamento"
    };

    // Convert PDF to base64
    const pdfBase64 = doc.output('datauristring');

    // Store data in localStorage
    const existingOrcamentos = JSON.parse(localStorage.getItem('orcamentos') || '[]');
    const newOrcamentos = [...existingOrcamentos, {
      ...dadosOrcamento,
      pdf: pdfBase64
    }];
    localStorage.setItem('orcamentos', JSON.stringify(newOrcamentos));

  }

  const nextStep = () => {
    if (step === 2) {
      // Validate Step 1
      if (!formData.objective || !formData.pages.length) {
        alert("Por favor preencha todos os campos obrigatórios antes de continuar");
        return;
      }
    } else if (step === 3) {
      // Validate Step 2
      if (!formData.advancedFeatures.length || !formData.analyticsFeatures.length || 
          !formData.integrations.length || !formData.languages.length) {
        alert("Por favor preencha todos os campos obrigatórios antes de continuar");
        return;
      }
    }

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 2) {
      setStep(step - 1);
    } else if (step === 2) {
      // Call the parent component's callback to go back to step 1
      onStepBack();
    }
  };

  // Update the animation variants
  const slideVariants = {
    enter: {
      opacity: 0,
      x: 0,
      y: 20
    },
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      x: 0,
      y: -20
    }
  };

  //Primeiro Componente Criado
  const Step1 = () => (
    <motion.div
      initial={false}
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
      key="step2"
      layoutId="formStep"
    >
      <h3 className="h3title">Detalhes do Sistema CRM</h3>
      <div>
        <div>
          <label htmlFor="objective">Sistema novo ou modernização?</label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="novoSite">Novo Website de CRM</option>
            <option value="modernizacao">Modernização de website CRM</option>
          </select>
        </div>
        <div>
          <h4>Módulos Base do CRM</h4>
          <div className="custom-checkbox">
            {[
              { value: "dashboardPage", label: "Dashboard Principal" },
              { value: "contactsPage", label: "Gestão de Contactos" },
              { value: "leadsPage", label: "Gestão de Leads" },
              { value: "tasksPage", label: "Gestão de Tarefas" },
              { value: "reportsPage", label: "Relatórios e Análises" },
              { value: "documentsPage", label: "Gestão Documental" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="pages"
                  value={value}
                  checked={formData.pages.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
        >
          Anterior
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
        >
          Próximo
        </motion.button>
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div
      initial={false}
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
      key="step3"
      layoutId="formStep"
    >
      <h3 className="h3title">Funcionalidades Avançadas</h3>
      <div>
        <div>
          <p className="labels">Recursos Avançados:</p>
          <div className="custom-checkbox">
            {[
              { value: "automationFeature", label: "Automação de Workflows" },
              { value: "calendarIntegration", label: "Integração de Calendário" },
              { value: "fileStorage", label: "Sistema de Armazenamento" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="advancedFeatures"
                  value={value}
                  checked={formData.advancedFeatures.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="labels">Análises e Relatórios:</p>
          <div className="custom-checkbox">
            {[
              { value: "basicAnalytics", label: "Análises Básicas" },
              { value: "advancedAnalytics", label: "Análises Avançadas" },
              { value: "customReports", label: "Relatórios Personalizados" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="analyticsFeatures"
                  value={value}
                  checked={formData.analyticsFeatures.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="labels">Integrações e APIs:</p>
          <div className="custom-checkbox">
            {[
              { value: "emailProvider", label: "Integração de Email" },
              { value: "thirdPartyApps", label: "Integração de Aplicações Terceiras" },
              { value: "apiAccess", label: "Acesso à API" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="integrations"
                  value={value}
                  checked={formData.integrations.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>


        <div>
          <p className="labels">Idiomas do Website</p>
          <div className="custom-checkbox">
            {[
              { value: "portugues", label: "Português" },
              { value: "ingles", label: "Inglês" },
              { value: "frances", label: "Francês" },
              { value: "espanhol", label: "Espanhol" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="languages"
                  value={value}
                  checked={formData.languages.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div> 
      </div>
      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
        >
          Anterior
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
        >
          Próximo
        </motion.button>
      </div>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div
      initial={false}
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
      key="step4"
      layoutId="formStep"
    >
      <h3 className="h3title">Finalização</h3>
      <div>
      <div>
          <label htmlFor="companySupport">Suporte à empresa</label>
          <select
            id="companySupport"
            name="companySupport"
            value={formData.companySupport}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="suporteYes">Sim</option>
            <option value="suporteNo">Não</option>
          </select>
        </div>
        <div>
          <label htmlFor="maintenance">Período de manutenção</label>
          <select
            id="maintenance"
            name="maintenance"
            value={formData.maintenance}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="umAno">Um ano</option>
            <option value="doisAnos">Dois anos</option>
            <option value="tresAnos">Três anos</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="updateFrequency">Frequência de Atualização</label>
          <select
            id="updateFrequency"
            name="updateFrequency"
            value={formData.updateFrequency}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
          </select>
        </div>
      </div>
      <div className="button-container">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevStep}
        >
          Anterior
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
        >
          Gerar PDF
        </motion.button>
      </div>
    </motion.div>
  );

  // Update the return statement
  return (
    <>
      <HeaderForm currentStep={step} />
      <div className="form-blog-container">
        {step === 2 && <Step1 />}
        {step === 3 && <Step2 />}
        {step === 4 && <Step3 />}
        <p className="p">*obrigatório</p>
      </div>
    </>
  )
}

