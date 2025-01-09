import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { jsPDFTable } from "jspdf-autotable";
import "../formsFinal.css";
import logo from "../../../assets/logoPequeno.png";
import HeaderForm from "../../Header/HeaderForm";

export default function FormECommerce({ formData: initialFormData, setFormData: setInitialFormData, initialStep, onStepBack }) {
  const PRICE_MAP = {
   //Paginas
   //preço por hora é de 20€
    mainPage: 160,
    aboutPage: 160,
    contactPage:160,
    lojaPage: 320,
    userSection: 160,
    politicaPage: 160,
    
    //tipo de site
    novoSite: 0,
    modernizacao: 0, 
    // nao adcionar um preço aqui pois depois tenho que fazer um calculo se for site novo é o preço a multiplicar por 1.5x por exemplo e se for modernização é o preço a multiplicar por 1.25x por exemplo
   
    //Servicos de Design
    Logotipo: 80,
    Icons: 80,
    Banners:80,
    outras: 20,

    //Redes Sociais 12horas
    socialMedia: 140,

    //Meios de Pagamento 12horas
    paymentIntegration: 140,

    //Avaliação de Produtos 12horas
    productReviews: 140,

    //Suporte ao cliente 12horas
    clientSupport: 140,

    //Manutençao
    umAno: 200,
    doisAnos: 350,
    tresAnos: 500,
    

    //Atualizaçao
    semanal: 400,
    mensal: 250,
    trimestral: 150,

    //Idiomas
    portugues: 10,
    ingles: 20,
    frances: 20,
    espanhol: 20,
  };
/*   const [selectedForm, setSelectedForm] = useState(null); */
  const [formData, setFormData] = useState({
    nome: '',
    contacto: '',
    email: '',
    objective: "",
    pages: [],
    designServices: [],
    integrations: [],
    features: [],
    socialMedia: "",
    paymentIntegration: "",
    productReviews: "",
    customerSupport: [],
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
    
    // Generate order number
    const orderNumber = `WQ${Date.now().toString().slice(-6)}`;

    
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
    if (!formData.designServices.length) {
      validationErrors.push("Por favor selecione pelo menos um serviço de design");
    }

    // Check required selects
    if (!formData.socialMedia) {
      validationErrors.push("Por favor selecione a opção de integração com redes sociais");
    }

    if (!formData.paymentIntegration) {
      validationErrors.push("Por favor selecione a opção de integração de pagamento");
    }

    if (!formData.productReviews) {
      validationErrors.push("Por favor selecione a opção de avaliação de produtos");
    }

    if (!formData.clientSupport) {
      validationErrors.push("Por favor selecione a opção de suporte ao cliente");
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

    // If validation passes, continue with existing submit logic
    let total = 0;

    // Pages cost
    formData.pages.forEach(page => {
      total += PRICE_MAP[page] || 0;
    });

    // Design Services
    formData.designServices.forEach(service => {
      total += PRICE_MAP[service] || 0;
    });

    // Social Media Integration
    if (formData.socialMedia === "yes") {
      total += PRICE_MAP.socialMedia;
    }

    // Payment Integration
    if (formData.paymentIntegration === "integracaoPg") {
      total += PRICE_MAP.paymentIntegration;
    }

    // Product Reviews
    if (formData.productReviews === "avaliacaoProdutos") {
      total += PRICE_MAP.productReviews;
    }

    // Customer Support
    if (formData.clientSupport === "suporteYes") {
      total += PRICE_MAP.clientSupport;
    }

    // Maintenance
    if (formData.maintenance) {
      total += PRICE_MAP[formData.maintenance];
    }

    // Update Frequency
    if (formData.updateFrequency) {
      total += PRICE_MAP[formData.updateFrequency];
    }

    // Languages
    formData.languages.forEach(lang => {
      total += PRICE_MAP[lang] || 0;
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
    doc.text(`WQ${Date.now().toString().slice(-6)}`, 155, 27);
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
                ["Páginas: ", "", "", "20€ / Hora", "-"],
                ...formData.pages.map(page => {
                    const pageLabel = {
                        mainPage: "Página Inicial",
                        aboutPage: "Sobre",
                        contactPage: "Contato",
                        lojaPage: "Loja",
                        userSection: "Secção de users",
                        politicaPage: "Política de devoluções",
                    }[page];

                    // Set hours based on page type
                    const hours = page === 'lojaPage' ? "16" : "8";
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
      console.log("Design Services Selected:", formData.designServices);
      const designTotal = formData.designServices.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
      body: [
        ["Design", "", "", "10€ / Hora", "-"],
        ...formData.designServices.map(service => {
        const designLabel = {
          Logotipo: "Logotipo",
          Icons: "Icons",
          Banners: "Banners",
          outras: "Outros"
        }[service];
        const design = service === 'outras' ? "2" : "8";
        return ["",designLabel, design, PRICE_MAP[service] + " €"];
      }),
    ],
      foot: [[
        '',
        '',
        'Subtotal',
        `${designTotal} €`
        
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



//Tabela PDF para as integrações
  finalY = doc.lastAutoTable.finalY;
   const integrations = [];
   if (formData.socialMedia === "yes") {
     integrations.push(["", "Redes Sociais", "12", `${PRICE_MAP.socialMedia} €`]);
   }
   if (formData.productReviews === "avaliacaoProdutos") {
     integrations.push(["", "Sistema de Avaliação de Produtos", "12", `${PRICE_MAP.productReviews} €`]);
   }
   
    doc.autoTable({
     startY: finalY + 10,
     head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
     body: [["Integrações", "", "", "20€ / Hora", "-"],
     ...integrations.length > 0 ? integrations : [["Sem integraçoes selecionadas.", "", "", "", "Subtotal: 0 €"]],
   ],
     foot: [[
       '',
       '',
       'Subtotal',
       `${(
        (formData.socialMedia === "yes" ? PRICE_MAP.socialMedia : 0) + 
        (formData.productReviews === "avaliacaoProdutos" ? PRICE_MAP.productReviews : 0)
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
   });

   //Tabela PDF para as features
    const features = []
    if (formData.paymentIntegration === "integracaoPg") {
      features.push(["", "Métodos de Pagamento", "12", `${PRICE_MAP.paymentIntegration} €`]);
    }
    if(formData.clientSupport === "suporteYes"){
      features.push(["", "Suporte ao Cliente", "12", `${PRICE_MAP.clientSupport} €`]);
    }

    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 10,
      head: [['Tipo de serviço', "", 'Horas', 'Preço (€)']],
      body: [["Serviços adicionais", "", "", "20€ / Hora", "-"],
      ...features.length > 0 ? features : [["Sem features selecionadas.", "", "", "", "Subtotal: 0 €"]],
    ],
      foot: [[
        '',
        '',
        'Subtotal',
        `${(
            (formData.paymentIntegration === "integracaoPg" ? PRICE_MAP.paymentIntegration : 0) + 
            (formData.clientSupport === "suporteYes" ? PRICE_MAP.clientSupport : 0)
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
      // Pages cost
      formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0) +
      // Design Services
      formData.designServices.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0) +
      // Social Media Integration
      (formData.socialMedia === "yes" ? PRICE_MAP.socialMedia : 0) +
      // Payment Integration
      (formData.paymentIntegration === "integracaoPg" ? PRICE_MAP.paymentIntegration : 0) +
      // Product Reviews
      (formData.productReviews === "avaliacaoProdutos" ? PRICE_MAP.productReviews : 0) +
      // Customer Support
      (formData.clientSupport === "suporteYes" ? PRICE_MAP.clientSupport : 0) +
      // Languages
      formData.languages.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0) +
      // Maintenance
      (PRICE_MAP[formData.maintenance] || 0) +
      // Update Frequency
      (PRICE_MAP[formData.updateFrequency] || 0)
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
      orderNumber: orderNumber,
      informacoesCliente: {
        nome: initialFormData.nome,
        telefone: initialFormData.contacto,
        email: initialFormData.email
      },
      detalhesWebsite: {
        tipoWebsite: formData.objective === "novoSite" ? "Novo Website" : "Modernização",
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

    // Alert success and optionally redirect
    alert('Orçamento salvo com sucesso!');
    // Optional: Redirect to admin page
    // window.location.href = '/admin';
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
      if (!formData.designServices.length || !formData.socialMedia || 
          !formData.paymentIntegration || !formData.productReviews || 
          !formData.clientSupport || !formData.languages.length) {
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
      <h3 className="h3title">Detalhes do Website</h3>
      <div>
        <div>
          <label htmlFor="objective">Website novo ou modernização?</label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="novoSite">Novo</option>
            <option value="modernizacao">Modernização</option>
          </select>
        </div>
        <div>
          <h4>Quais páginas o site precisa?</h4>
          <div className="custom-checkbox">
            {[
              { value: "mainPage", label: "Página Inicial" },
              { value: "aboutPage", label: "Sobre" },
              { value: "contactPage", label: "Contato" },
              { value: "lojaPage", label: "Loja" },
              { value: "userSection", label: "Secção de users" },
              { value: "politicaPage", label: "Política de devoluções" },
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
      <h3 className="h3title">Serviços Adicionais</h3>
      <div>
        <div>
          <p className="labels">Serviços de Design:</p>
          <div className="custom-checkbox">
            {[
              { value: "Logotipo", label: "Logotipo" },
              { value: "Icons", label: "Icons" },
              { value: "Banners", label: "Banners" },
              { value: "outras", label: "Outros" },
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
      
        <div>
          <label htmlFor="socialMedia" className="labels">Integração com redes sociais:</label>
          <select
            id="socialMedia"
            name="socialMedia"
            value={formData.socialMedia}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="paymentIntegration">Integração com meios de pagamento</label>
          <select
            id="paymentIntegration"
            name="paymentIntegration"
            value={formData.paymentIntegration}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="integracaoPg">Sim</option>
            <option value="semIntPg">Não</option>
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="productReviews">Avaliação de produtos</label>
          <select
            id="productReviews"
            name="productReviews"
            value={formData.productReviews}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="avaliacaoProdutos">Sim</option>
            <option value="semAvaProd">Não</option>
          </select>
        </div>
        <div>
          <label htmlFor="clientSupport">Suporte ao cliente</label>
          <select
            id="clientSupport"
            name="clientSupport"
            value={formData.clientSupport}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione</option>
            <option value="suporteYes">Sim</option>
            <option value="suporteNo">Não</option>
          </select>
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

