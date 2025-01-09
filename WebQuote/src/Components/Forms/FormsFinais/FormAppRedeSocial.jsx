import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { jsPDFTable } from "jspdf-autotable";
import "../formsFinal.css";
import logo from "../../../assets/logoPequeno.png";
import HeaderForm from "../../Header/HeaderForm";

export default function FormAppRedeSocial({ formData: initialFormData, setFormData: setInitialFormData, initialStep, onStepBack }) {
  const PRICE_MAP = {
   // Core Features (base pages)
    feedPage: 320,        // Complex feed with posts
    profilePage: 160,     // User profile
    messagesPage: 240,    // Chat/messaging system
    notificationsPage: 160, // Notifications center
    searchPage: 160,      // Search functionality
    settingsPage: 160,    // User settings
    
    // Type of app
    novoApp: 0,
    modernizacao: 0,
    
    // Design Services
    Logotipo: 80,
    Icons: 80,
    Banners: 80,
    outras: 20,

    // Social Features
    userFollowing: 140,    // Follow/unfollow system
    contentSharing: 140,   // Ability to share posts
    reactions: 140,        // Likes, reactions, comments
    tagging: 140,         // User tagging in posts

    // Media Features
    photoUpload: 140,     // Photo upload and handling
    videoUpload: 200,     // Video upload and handling
    audioUpload: 160,     // Audio upload and handling
    filters: 180,         // Media filters and effects

    // Maintenance
    umAno: 200,
    doisAnos: 350,
    tresAnos: 500,

    // Updates
    semanal: 400,
    mensal: 250,
    trimestral: 150,

    // Languages
    portugues: 10,
    ingles: 20,
    frances: 20,
    espanhol: 20,

    // Backend Services
    userAuth: 200,         // User authentication system
    dataStorage: 180,      // Database setup and management
    pushNotifications: 160, // Push notification system
    analytics: 140,        // Analytics integration
    
    // API Integration
    googleAuth: 120,       // Google authentication
    facebookAuth: 120,     // Facebook authentication
    cloudStorage: 160,     // Cloud storage integration
    locationServices: 140, // Geolocation services
    
    // Security Features
    encryption: 180,       // Data encryption
    contentModeration: 200, // Content moderation system
    privacyControls: 160,  // Privacy settings and controls
    
    // Server Infrastructure
    basicServer: 100,      // Basic server setup
    scalableServer: 200,   // Scalable server architecture
    loadBalancing: 160,    // Load balancing setup
    
  };
/*   const [selectedForm, setSelectedForm] = useState(null); */
  const [formData, setFormData] = useState({
    nome: '',
    contacto: '',
    email: '',
    objective: "",
    pages: [],
    designServices: [],
    socialFeatures: [],
    mediaFeatures: [],
    maintenance: "",
    updateFrequency: "",
    languages: [],
    backendServices: [],
    apiIntegrations: [],
    securityFeatures: [],
    serverInfra: "",
    databaseType: "",
    hostingType: "",
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

    // Validation checks
    const validationErrors = [];
    if (!formData.objective) {
      validationErrors.push("Por favor selecione se deseja um website novo ou modernização");
    }
    if (!formData.pages.length) {
      validationErrors.push("Por favor selecione pelo menos uma página");
    }
    if (!formData.designServices.length) {
      validationErrors.push("Por favor selecione pelo menos um serviço de design");
    }
    if (!formData.languages.length) {
      validationErrors.push("Por favor selecione pelo menos um idioma");
    }
    if (!formData.maintenance) {
      validationErrors.push("Por favor selecione um período de manutenção");
    }
    if (!formData.updateFrequency) {
      validationErrors.push("Por favor selecione uma frequência de atualização");
    }
    if (validationErrors.length > 0) {
      alert(validationErrors.join("\n"));
      return;
    }

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
    doc.text(`WQ${Date.now().toString().slice(-6)}`, 155, 27);
    doc.text(new Date().toLocaleDateString(), 155, 31);

    // Tabela para o tipo de website novo ou modernizar
    doc.autoTable({
      startY: 45,
      head: [['Tipo de serviço', "", '', '']],
      body: [[
        "Website",
        formData.objective === "novoApp" ? "Desenvolvimento de um app novo" : 
        formData.objective === "modernizacao" ? "Modernização de um app existente" : "",
        "",
        "",
        formData.objective ? PRICE_MAP[formData.objective] + " €" : "0 €"
      ]],
      foot: [[
        '',
        '',
        '',
        'Subtotal',
        `${PRICE_MAP[formData.objective] || 0} €`
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
    const pagesTotal = formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0);
    doc.autoTable({
        startY: finalY + 10,
        head: [['Tipo de serviço', "Descrição", 'Horas', 'Preço (€)']],
        body: [
            ["Páginas: ", "", "", "20€ / Hora"],
            ...formData.pages.map(page => {
                const pageLabel = {
                    feedPage: "Feed Principal",
                    profilePage: "Perfil de Usuário",
                    messagesPage: "Mensagens",
                    notificationsPage: "Notificações",
                    searchPage: "Pesquisa",
                    settingsPage: "Configurações",
                }[page];

                // Set hours based on page type
                const hours = page === 'feedPage' ? "16" : "8";
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
    
    finalY = doc.lastAutoTable.finalY;
    const socialFeaturesTotal = formData.socialFeatures.reduce((sum, feature) => sum + (PRICE_MAP[feature] || 0), 0);
    doc.autoTable({
        startY: finalY + 10,
        head: [['Tipo de serviço', "Descrição", 'Horas', 'Preço (€)']],
        body: [
            ["Recursos Sociais", "", "", "20€ /Hora"],
            ...formData.socialFeatures.map(feature => {
                const featureLabel = {
                    userFollowing: "Sistema de Seguidores",
                    contentSharing: "Compartilhamento de Conteúdo",
                    reactions: "Reações e Comentários",
                    tagging: "Marcação de Usuários"
                }[feature];
                return ["", featureLabel, "7", PRICE_MAP[feature] + " €"];
            })
        ],
        foot: [[
            '',
            '',
            'Subtotal',
            `${socialFeaturesTotal} €`
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

    // Media Features Table
    finalY = doc.lastAutoTable.finalY;
    const mediaFeaturesTotal = formData.mediaFeatures.reduce((sum, feature) => sum + (PRICE_MAP[feature] || 0), 0);
    doc.autoTable({
        startY: finalY + 10,
        head: [['Tipo de serviço', "Descrição", 'Horas', 'Preço (€)']],
        body: [
            ["Recursos de Mídia", "", "", "20€/ Hora"],
            ...formData.mediaFeatures.map(feature => {
                const featureLabel = {
                    photoUpload: "Upload de Fotos",
                    videoUpload: "Upload de Vídeos",
                    audioUpload: "Upload de Áudio",
                    filters: "Filtros e Efeitos"
                }[feature];
                const hours = feature === 'videoUpload' ? "10" :"7";
                return ["", featureLabel, hours, PRICE_MAP[feature]+ " €"];
            })
        ],
        foot: [[
            '',
            '',
            'Subtotal',
            `${mediaFeaturesTotal} €`
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

    // Backend Services Table
    finalY = doc.lastAutoTable.finalY;
    const backendTotal = formData.backendServices.reduce((sum, service)=> sum + (PRICE_MAP[service] || 0), 0);
    doc.autoTable({
        startY: finalY + 10,
        head: [['Tipo de serviço', "Descrição", 'Horas', 'Preço (€)']],
        body: [
            ["Serviços Backend", "", "", "25€ /Hora"],
            ...formData.backendServices.map(service => {
                const serviceLabel = {
                    userAuth: "Sistema de Autenticação",
                    dataStorage: "Armazenamento de Dados",
                    pushNotifications: "Notificações Push",
                    analytics: "Analytics"
                }[service];
                return ["", serviceLabel, "8", PRICE_MAP[service] + " €"];
            })
        ],
        foot: [[
            '',
            '',
            'Subtotal',
            `${backendTotal} €`
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

    // API Integrations Table
    

    // Infrastructure Table
    
    // Languages Table
    finalY = doc.lastAutoTable.finalY;
      const languagesTotal = formData.languages.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "Descrição", 'Horas', 'Preço (€)']],
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
    const finalTotal = (
      // Website Type multiplier
      (
        // Pages cost
        formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0) +
        // Design Services
        formData.designServices.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0) +
        // Social Features
        formData.socialFeatures.reduce((sum, feature) => sum + (PRICE_MAP[feature] || 0), 0) +
        // Media Features
        formData.mediaFeatures.reduce((sum, feature) => sum + (PRICE_MAP[feature] || 0), 0) +
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
        `${finalTotal.toFixed(2)} €`
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
      informacoesCliente: {
        nome: document.querySelector('input[placeholder="Digite o nome e apelido"]').value,
        telefone: document.querySelector('input[placeholder="Digite o contacto"]').value,
        email: document.querySelector('input[placeholder="Digite o email"]').value
      },
      detalhesWebsite: {
        tipoWebsite: formData.objective === "novoApp" ? "Novo App" : "Modernização",
        paginas: formData.pages,
        servicosDesign: formData.designServices,
        redesSociais: formData.socialMedia === "yes" ? "Sim" : "Não",
        integracaoPagamento: formData.paymentIntegration === "integracaoPg" ? "Sim" : "Não",
        avaliacaoProdutos: formData.productReviews === "avaliacaoProdutos" ? "Sim" : "Não",
        suporteCliente: formData.clientSupport === "suporteYes" ? "Sim" : "Não",
        periodoManutencao: formData.maintenance,
        frequenciaAtualizacao: formData.updateFrequency,
        idiomas: formData.languages
      },
      orcamento: {
        valorTotal: total.toFixed(2),
        moeda: "€"
      },
      dataSubmissao: new Date().toISOString()
    };
  
    try {
      // Envio dos dados para o servidor
      const response = await fetch('http://localhost:3000/api/orcamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosOrcamento)
      });
      if (!response.ok) {
        throw new Error('Erro ao salvar orçamento');
      }
      alert("Orçamento enviado com sucesso!")
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
    }
  }

  const nextStep = () => {
    if (step === 2) {
      // Validate Step 1 (Basic App Setup)
      if (!formData.objective) {
        alert("Por favor selecione se deseja um app novo ou modernização");
        return;
      }
      if (!formData.pages.length) {
        alert("Por favor selecione pelo menos uma página");
        return;
      }
      if (!formData.designServices.length) {
        alert("Por favor selecione pelo menos um serviço de design");
        return;
      }
    } 
    else if (step === 3) {
      // Validate Step 2 (Features and Backend)
      if (!formData.socialFeatures.length) {
        alert("Por favor selecione pelo menos um recurso social");
        return;
      }
      if (!formData.mediaFeatures.length) {
        alert("Por favor selecione pelo menos um recurso de mídia");
        return;
      }
      if (!formData.backendServices.length) {
        alert("Por favor selecione pelo menos um serviço backend");
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

  // Step 1: Basic App Setup
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
      <h3 className="h3title">Detalhes da App</h3>
      <div>
        <div>
          <label htmlFor="objective">App nova ou modernização?</label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="novoApp">Nova</option>
            <option value="modernizacao">Modernização</option>
          </select>
        </div>
        <div>
          <h4>Páginas Principais</h4>
          <div className="custom-checkbox">
            {[
              { value: "feedPage", label: "Feed Principal" },
              { value: "profilePage", label: "Perfil de Usuário" },
              { value: "messagesPage", label: "Mensagens" },
              { value: "notificationsPage", label: "Notificações" },
              { value: "searchPage", label: "Pesquisa" },
              { value: "settingsPage", label: "Configurações" },
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
        <div>
          <h4>Serviços de Design</h4>
          <div className="custom-checkbox">
            {[
              { value: "Logotipo", label: "Logotipo" },
              { value: "Icons", label: "Ícones" },
              { value: "Banners", label: "Banners" },
              { value: "outras", label: "Outras Artes" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="designServices"
                  value={value}
                  checked={formData.designServices.includes(value)}
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

  // Step 2: Features and Backend
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
      <h3 className="h3title">Recursos e Backend</h3>
      <div>
        <div>
          <p className="labels">Recursos Sociais:</p>
          <div className="custom-checkbox">
            {[
              { value: "userFollowing", label: "Sistema de Seguidores" },
              { value: "contentSharing", label: "Compartilhamento" },
              { value: "reactions", label: "Reações e Comentários" },
              { value: "tagging", label: "Marcação de Usuários" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="socialFeatures"
                  value={value}
                  checked={formData.socialFeatures.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="labels">Recursos de Mídia:</p>
          <div className="custom-checkbox">
            {[
              { value: "photoUpload", label: "Upload de Fotos" },
              { value: "videoUpload", label: "Upload de Vídeos" },
              { value: "audioUpload", label: "Upload de Áudio" },
              { value: "filters", label: "Filtros e Efeitos" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="mediaFeatures"
                  value={value}
                  checked={formData.mediaFeatures.includes(value)}
                  onChange={handleInputChange}
                />
                <label htmlFor={value}>{label}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="labels">Serviços Backend:</p>
          <div className="custom-checkbox">
            {[
              { value: "userAuth", label: "Sistema de Autenticação" },
              { value: "dataStorage", label: "Armazenamento de Dados" },
              { value: "pushNotifications", label: "Notificações Push" },
              { value: "analytics", label: "Analytics" },
            ].map(({ value, label }) => (
              <div key={value}>
                <input
                  type="checkbox"
                  id={value}
                  name="backendServices"
                  value={value}
                  checked={formData.backendServices.includes(value)}
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

  // Step 3: Final Configuration
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
      <h3 className="h3title">Configuração Final</h3>
      <div>
        <div>
          <p className="labels">Idiomas:</p>
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

        <div>
          <label htmlFor="maintenance">Período de Manutenção:</label>
          <select
            id="maintenance"
            name="maintenance"
            value={formData.maintenance}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="umAno">1 Ano</option>
            <option value="doisAnos">2 Anos</option>
            <option value="tresAnos">3 Anos</option>
          </select>
        </div>

        <div>
          <label htmlFor="updateFrequency">Frequência de Atualizações:</label>
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
  );
}


