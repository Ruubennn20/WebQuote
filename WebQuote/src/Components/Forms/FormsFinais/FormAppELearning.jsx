import React, { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { jsPDFTable } from "jspdf-autotable";
import "../formsFinal.css";
import logo from "../../../assets/WebQuoteLogo.jpg";
import HeaderForm from "../../Header/HeaderForm";

export default function FormAppELearning({ formData: initialFormData, setFormData: setInitialFormData, initialStep, onStepBack }) {
  const PRICE_MAP = {
   //Paginas
    mainPage: 100,
    aboutPage: 100,
    contactPage:100,
    lojaPage: 100,
    userSection: 100,
    politicaPage: 100,
    
    //tipo de site
    novoSite: 0,
    modernizacao: 0, 
    // nao adcionar um preço aqui pois depois tenho que fazer um calculo se for site novo é o preço a multiplicar por 1.5x por exemplo e se for modernização é o preço a multiplicar por 1.25x por exemplo
   
    //Servicos de Design
    Logotipo: 50,
    Icons: 40,
    Banners:50,
    outras: 10,

    //Redes Sociais
    socialMedia: 80,

    //Meios de Pagamento
    paymentIntegration: 80,

    //Avaliação de Produtos
    productReviews: 80,

    //Suporte ao cliente
    clientSupport: 200,

    //Manutençao
    umAno: 200,
    doisAnos: 350,
    tresAnos: 500,
    

    //Atualizaçao
    semanal: 100,
    mensal: 50,
    trimestral: 20,

    //Idiomas
    portugues: 10,
    ingles: 20,
    frances: 20,
    espanhol: 20,
  };
  const [selectedForm, setSelectedForm] = useState(null);
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

    let total = 0;

    // Calculate total based on selections
    // Website Type multiplier
    const websiteMultiplier = formData.objective === "novoSite" ? 1.5 : 
                             formData.objective === "modernizacao" ? 1.25 : 1;

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

    // Cálculo do custo do website
    total += PRICE_MAP[formData.objective] || 0;
  
    // Cálculo do custo das páginas
    formData.pages.forEach((page) => {
      total += PRICE_MAP[page] || 0;
    });
  
    // Cálculo do custo de manutenção
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

    // Apply website type multiplier to final total
    total = total * websiteMultiplier; 

    const doc = new jsPDF();
    
    doc.addImage(logo, 'JPEG', 10, 5, 40, 12);
    doc.setFontSize(10);
    doc.text('WEBQUOTE', 150, 10);
    doc.text('Website Blog', 150, 15);
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 18, 200, 18);
    
    // Client Information
    doc.text('Contact Information', 13, 23);
    doc.text(`Nome: ${initialFormData.nome || ''}`, 13, 28);
    doc.text(`Contacto: ${initialFormData.contacto || ''}`, 13, 32);
    doc.text(`Email: ${initialFormData.email || ''}`, 13, 36);
    
    // Quote details
    doc.setFont('Helvetica', 'bold');
    doc.text('Fatura Num    :', 130, 23);
    doc.text('Data          :', 130, 27);
    doc.setFont('Helvetica', 'normal');
    doc.text(`WQ${Date.now().toString().slice(-6)}`, 155, 23);
    doc.text(new Date().toLocaleDateString(), 155, 27);

    // Tabela para o tipo de website novo ou modernizar
    doc.autoTable({
      startY: 45,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: [[
        "Type",
        formData.objective === "novoSite" ? "New Website Development" : 
        formData.objective === "modernizacao" ? "Website Modernization" : "",
        "1",
        "Service",
        formData.objective ? PRICE_MAP[formData.objective] + " €" : "0 €"
      ]],
      foot: [[
        '',
        'Subtotal',
        '',
        '',
        `${PRICE_MAP[formData.objective] || 0} €`
      ]],
      headStyles: {
        fillColor: [26, 188, 156],
        textColor: 255,
        fontSize: 10,
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    // Pages Table
    let finalY = doc.lastAutoTable.finalY;

    //Tabela para as páginas
    if (formData.pages.length > 0) {
        const pagesTotal = formData.pages.reduce((sum, page) => sum + (PRICE_MAP[page] || 0), 0);
        doc.autoTable({
            startY: finalY + 10,
            head: [['Type', 'Tipo de serviço', 'Horas', 'Price (€)']],
            body: [
                ["Pages", "", formData.pages.length.toString(), "20€ / Hora", "-"],
                ...formData.pages.map(page => {
                    const pageLabel = {
                        mainPage: "Página Inicial",
                        aboutPage: "Sobre",
                        contactPage: "Contato",
                        lojaPage: "Loja",
                        userSection: "Secção de users",
                        politicaPage: "Política de devoluções",
                        outras: "Outras"
                    }[page];
                    return ["", pageLabel, "1",  (PRICE_MAP[page] || 0) + " €"];
                })
              ],
              foot: [[
                '',
                'Subtotal',
                '',
                `${pagesTotal} €` 
                
              ]],
              headStyles: {
                fillColor: [26, 188, 156],
                textColor: 255,
                fontSize: 10,
              },
              styles: { fontSize: 10, cellPadding: 3 },
              theme: 'grid',
            });
    } else {
        // If no pages are selected, show a message in the table while keeping the Type header
        doc.autoTable({
          startY: finalY + 10,
          head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
          body: [
              ["Nada Selecionado.", "", "", "", "Total: 0 €"]
          ],
          headStyles: {
              fillColor: [26, 188, 156], // Keep the same color
              textColor: 255,
              fontSize: 10,
          },
          footStyles: {
              fillColor: [26, 188, 156] ,
              textColor: 0,
              fontSize: 10,
              cellPadding: 1, // Adjust padding for the footer specifically
          },
          styles: { 
              fontSize: 10, 
              cellPadding: 3 // Keep this for the rest of the table
          },
          theme: 'grid',
      });
    }
    
    // Tabela para os serviços de design
    finalY = doc.lastAutoTable.finalY;
    if(formData.designServices.length > 0){
      console.log("Design Services Selected:", formData.designServices);
      const designTotal = formData.designServices.reduce((sum, service) => sum + (PRICE_MAP[service] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Tipo de serviço', 'Horas', 'Price (€)']],
      body: [
        ["Design", "", formData.designServices.length.toString(), "10€ / Hora", "-"],
        ...formData.designServices.map(service => {
        const designLabel = {
          Logotipo: "Logotipo",
          Icons: "Icons",
          Banners: "Banners",
          outras: "Outros"
        }[service];
        return ["",designLabel, "4", PRICE_MAP[service] + " €"];
      }),
    ],
      foot: [[
        '',
        'Subtotal',
        '',
        `${designTotal} €` 
        
      ]],
      headStyles: {
        fillColor: [26, 188, 156],
        textColor: 255,
        fontSize: 10,
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    
  }else{
    doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Tipo de serviço', 'Horas', 'Price (€)']],
      body: [
          ["No design selected.", "", "", "Total: 0 €"]
      ], 
      headStyles: {
          fillColor: [26, 188, 156], // Keep the same color
          textColor: 255,
          fontSize: 10,
      },
      footStyles: {
          fillColor: [200, 200, 200], // Keep the same color
          textColor: 0,
          fontSize: 10,
          cellPadding: 1, // Adjust padding for the footer specifically
      },
      styles: { 
          fontSize: 10, 
          cellPadding: 3
      },
      theme: 'grid',
  });
  }

    // Languages Table
    finalY = doc.lastAutoTable.finalY;
    if(formData.languages.length >0){
      const languagesTotal = formData.languages.reduce((sum, lang) => sum + (PRICE_MAP[lang] || 0), 0);
      doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
     
      body:[["Linguagem", "", formData.languages.length.toString(), "20€ / Hora", "-"],
      ...formData.languages.map(lang => {
        const langLabel = {
          portugues: "portugues",
          ingles: "ingles",
          frances: "frances",
          espanhol: "espanhol"
        }[lang];
        return ["", langLabel, "1", "Unit", PRICE_MAP[lang] + " €"];
      }),
    ],
      foot: [[
        '',
        'Subtotal',
        '',
        '',
        `${languagesTotal} €`
      ]],
      headStyles: {
        fillColor: [26, 188, 156],
        textColor: 255,
        fontSize: 10,
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });
  }else{
    doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: [
          ["No pages selected.", "Total: 0 €", "", "", ""]
      ],
      headStyles: {
          fillColor: [26, 188, 156], // Keep the same color
          textColor: 255,
          fontSize: 10,
      },
      footStyles: {
          fillColor: [200, 200, 200], // Keep the same color
          textColor: 0,
          fontSize: 10,
          cellPadding: 1, // Adjust padding for the footer specifically
      },
      styles: { 
          fontSize: 10, 
          cellPadding: 3 // Keep this for the rest of the table
      },
      theme: 'grid',
  });
  }

    // Social Media Integration Table
    finalY = doc.lastAutoTable.finalY;
   const integrations = [];
   if (formData.socialMedia === "yes") {
     integrations.push(["", "Social Media Integration", "1", "Service", `${PRICE_MAP.socialMedia} €`]);
   }
   if (formData.productReviews === "avaliacaoProdutos") {
     integrations.push(["", "Product Reviews System", "1", "Service", `${PRICE_MAP.productReviews} €`]);
   }
   if(integrations.length > 0 ){
    doc.autoTable({
     startY: finalY + 10,
     head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
     body: [["Integrações", "", "", "20€ / Hora", "-"],
     ...integrations.length > 0 ? integrations : [["No integrstions selected.", "", "", "", "Total: 0 €"]],
   ],
     foot: [[
       '',
       'Subtotal',
       '',
       '',
       `${integrations.reduce((sum, item) => sum + parseFloat(item[4]), 0) || 0} €`
     ]],
     headStyles: {
       fillColor: [26, 188, 156],
       textColor: 255,
       fontSize: 10,
     },
     styles: { fontSize: 10, cellPadding: 3 },
     theme: 'grid',
   });
  }else{
    doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: [
          ["Sem Integrações selecionas.", "Total: 0 €", "", "", ""]
      ],
      headStyles: {
          fillColor: [26, 188, 156], // Keep the same color
          textColor: 255,
          fontSize: 10,
      },
      footStyles: {
          fillColor: [200, 200, 200], // Keep the same color
          textColor: 0,
          fontSize: 10,
          cellPadding: 1, // Adjust padding for the footer specifically
      },
      styles: { 
          fontSize: 10, 
          cellPadding: 3 // Keep this for the rest of the table
      },
      theme: 'grid',
  });
  }

    const features = []
    if (formData.paymentIntegration === "integracaoPg") {
      features.push(["", "Payment Integration", "1", "Service", `${PRICE_MAP.paymentIntegration} €`]);
    }
    if(formData.clientSupport === "suporteYes"){
      features.push(["", "Suporte ao Cliente", "1", "Service", `${PRICE_MAP.clientSupport} €`]);
    }
    if(features.length > 0){
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: [["Features", "", "", "20€ / Hora", "-"],
      ...features.length > 0 ? features : [["No features selected.", "", "", "", "Total: 0 €"]],
    ],
      foot: [[
        '',
        'Subtotal',
        '',
        '',
        `${features.reduce((sum, item) => sum + parseFloat(item[4]), 0) || 0} €`
      ]],
      headStyles: {
        fillColor: [26, 188, 156],
        textColor: 255,
        fontSize: 10,
      },
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });
  }else{
    doc.autoTable({
      startY: finalY + 10,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: [
          ["Sem features selecionas.", "Total: 0 €", "", "", ""]
      ],
      headStyles: {
          fillColor: [26, 188, 156], // Keep the same color
          textColor: 255,
          fontSize: 10,
      },
      footStyles: {
          fillColor: [200, 200, 200], // Keep the same color
          textColor: 0,
          fontSize: 10,
          cellPadding: 1, // Adjust padding for the footer specifically
      },
      styles: { 
          fontSize: 10, 
          cellPadding: 3 // Keep this for the rest of the table
      },
      theme: 'grid',
  });
  }

  finalY = doc.lastAutoTable.finalY;
  const finalDetails = [];
  // Check for MaintenanceormData.maintenance) {
   finalDetails.push(["Manutenção", {
     umAno: "One Year Maintenance",
     doisAnos: "Two Years Maintenance",
     tresAnos: "Three Years Maintenance"
   }[formData.maintenance], "1", "Service", `${PRICE_MAP[formData.maintenance]} €`]);
  // Check for Update Frequency
  if (formData.updateFrequency) {
   finalDetails.push(["Atualizações", {
     semanal: "Weekly Updates",
     mensal: "Monthly Updates",
     trimestral: "Quarterly Updates"
   }[formData.updateFrequency], "1", "Service", `${PRICE_MAP[formData.updateFrequency]} €`]);
  
  // Draw the Final Table
  doc.autoTable({
   startY: finalY + 10,
   head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
   body: [["Pós venda ", "", " ", "20€ / Hora", "-"],
   ...finalDetails.length > 0 ? finalDetails : [["No maintenance or update frequency selected.", "", "", "", "Total: 0 €"]],
  ],
   foot: [[
     '',
     'Subtotal',
     '',
     '',
     `${finalDetails.reduce((sum, item) => sum + parseFloat(item[4]), 0) || 0} €`
   ]],
   headStyles: {
     fillColor: [26, 188, 156],
     textColor: 255,
     fontSize: 10,
   },
   styles: { fontSize: 10, cellPadding: 3 },
   theme: 'grid',
  })
}else{
  doc.autoTable({
    startY: finalY + 10,
    head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
    body: [
        ["Sem suporte nosso selecionao", "Total: 0 €", "", "", ""]
    ],
    headStyles: {
        fillColor: [26, 188, 156], // Keep the same color
        textColor: 255,
        fontSize: 10,
    },
    footStyles: {
        fillColor: [200, 200, 200], // Keep the same color
        textColor: 0,
        fontSize: 10,
        cellPadding: 1, // Adjust padding for the footer specifically
    },
    styles: { 
        fontSize: 10, 
        cellPadding: 3 // Keep this for the rest of the table
    },
    theme: 'grid',
});
}

    // Final Total Table
    finalY = doc.lastAutoTable.finalY;
    doc.autoTable({
      startY: finalY + 10,
      body: [[
        '',
        'Total Amount',
        '',
        '',
        `${total.toFixed(2)} €`
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
      <h3>Detalhes do Website</h3>
      <div>
        <div>
          <label htmlFor="objective">Website novo ou modernização?</label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="novoSite">Novo</option>
            <option value="modernizacao">Modernização</option>
          </select>
        </div>
        <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: "mainPage", label: "Página Inicial" },
              { value: "aboutPage", label: "Sobre" },
              { value: "contactPage", label: "Contato" },
              { value: "lojaPage", label: "Loja" },
              { value: "userSection", label: "Secção de users" },
              { value: "politicaPage", label: "Política de devoluções" },
              { value: "outras", label: "Outras" },
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


/*   const Step2 = () => (
    <motion.div
      initial={false}
      animate="center"
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.3 }}
      key="step2"
      layoutId="formStep"
    >
      <h3>Detalhes do Website</h3>
      <div>
        <div>
          <label htmlFor="objective">Website novo ou modernização?</label>
          <select
            id="objective"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="novoSite">Novo</option>
            <option value="modernizacao">Modernização</option>
          </select>
        </div>
        <div>
          <p>Quais páginas o site precisa?</p>
          <div>
            {[
              { value: "mainPage", label: "Página Inicial" },
              { value: "aboutPage", label: "Sobre" },
              { value: "contactPage", label: "Contato" },
              { value: "lojaPage", label: "Loja" },
              { value: "userSection", label: "Secção de users" },
              { value: "politicaPage", label: "Política de devoluções" },
              { value: "outras", label: "Outras" },
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
  ); */

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
      <h3>Serviços Adicionais</h3>
      <div>
        <div>
          <p>Serviços de Design</p>
          <div>
            {[
              { value: "Logotipo", label: "Logotipo" },
              { value: "Icons", label: "Icons" },
              { value: "Banners", label: "Banners" },
              { value: "outras", label: "Outros" },
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="designServices"
                  value={value}
                  checked={formData.designServices.includes(value)}
                  onChange={handleInputChange}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="socialMedia">Integração com redes sociais</label>
          <select
            id="socialMedia"
            name="socialMedia"
              
            value={formData.socialMedia}
            onChange={handleInputChange}
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
          >
            <option value="">Selecione</option>
            <option value="suporteYes">Sim</option>
            <option value="suporteNo">Não</option>
          </select>
        </div>
        <div>
          <p>Idiomas do Website</p>
          <div>
            {[
              { value: "portugues", label: "Português" },
              { value: "ingles", label: "Inglês" },
              { value: "frances", label: "Francês" },
              { value: "espanhol", label: "Espanhol" },
            ].map(({ value, label }) => (
              <label key={value}>
                <input
                  type="checkbox"
                  name="languages"
                  value={value}
                  checked={formData.languages.includes(value)}
                  onChange={handleInputChange}
                />
                {label}
              </label>
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
      <h3>Finalização</h3>
      <div>
        <div>
          <label htmlFor="maintenance">Período de manutenção</label>
          <select
            id="maintenance"
            name="maintenance"
              
            value={formData.maintenance}
            onChange={handleInputChange}
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
      </div>
    </>
  )
}

