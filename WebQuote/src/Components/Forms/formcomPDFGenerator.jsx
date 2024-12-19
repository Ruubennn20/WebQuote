import React, { useState } from "react";
import "./form.css";
import { jsPDF } from "jspdf";
import { jsPDFTable } from "jspdf-autotable";
import logo from "../../assets/WebQuoteLogo.jpg";

export default function FormInicial() {
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
    semanal: 20,
    mensal: 50,
    trimestral: 100,

    //Idiomas
    portugues: 10,
    ingles: 20,
    frances: 20,
    espanhol: 20,
  };
  const [selectedForm, setSelectedForm] = useState(null);
  const [formData, setFormData] = useState({
    objective: "",
    pages: [],
    designServices: [],
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

    // Maintenance

  
    let total = 0;
  
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
    
    // Header with logo and title
    doc.addImage(logo, 'JPEG', 10, 5, 40, 12);
    doc.setFontSize(10);
    doc.text('WEBSITE QUOTATION', 150, 12);

    // Add dividing line
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 18, 200, 18);

    // Client Information
    doc.text('Contact Information', 13, 23);
    doc.text(document.querySelector('input[placeholder="Digite o nome e apelido"]').value, 13, 28);
    doc.text(document.querySelector('input[placeholder="Digite o contacto"]').value, 13, 32);
    doc.text(document.querySelector('input[placeholder="Digite o email"]').value, 13, 36);


    // Quote details
    doc.setFont('Helvetica', 'bold');
    doc.text('Fatura Num    :', 130, 23);
    doc.text('Data          :', 130, 27);
    doc.setFont('Helvetica', 'normal');
    doc.text(`WQ${Date.now().toString().slice(-6)}`, 155, 23);
    doc.text(new Date().toLocaleDateString(), 155, 27);




    
    // Create the items table
    const itemDetailsRows = [
      // Website Type
      [
        "Type",
        formData.objective === "novoSite" ? "New Website Development" : 
        formData.objective === "modernizacao" ? "Website Modernization" : "",
        "1",
        "Service",
        formData.objective ? PRICE_MAP[formData.objective] + " €" : "0 €"
      ],
      // Pages Header
      [
        "Pages",
        "      ",
        formData.pages.length.toString(),
        "Group",
        "-"
      ],
      // Pages Section without type
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
        return [
          "",  // Empty type column
          pageLabel,
          "1",
          "Unit",
          PRICE_MAP[page] + " €"
        ];
      }),
      ...formData.designServices.map(service => {
        const serviceLabel = {
          Logotipo: "Logotipo",
          Icons: "Icons",
          Banners: "Banners",
          outras: "Outros"
        }[service];
        return [
          "Design",
          serviceLabel,
          "1",
          "Unit",
          PRICE_MAP[service] + " €"
        ];
      }),
      ...formData.languages.map(lang => {
        return [
          "Language",
          lang,
          "1",
          "Unit",
          PRICE_MAP[lang] + " €"
        ];
      }),
      ...(formData.socialMedia === "yes" ? [[
        "Integration",
        "Social Media Integration",
        "1",
        "Service",
        PRICE_MAP.socialMedia + " €"
      ]] : []),
      ...(formData.paymentIntegration === "integracaoPg" ? [[
        "Integration",
        "Payment Integration",
        "1",
        "Service",
        PRICE_MAP.paymentIntegration + " €"
      ]] : []),
      ...(formData.productReviews === "yes" ? [[
        "Integration",
        "Product Reviews",
        "1",
        "Service",
        PRICE_MAP.productReviews + " €"
      ]] : []),
      ...(formData.clientSupport === "yes" ? [[
        "Support",
        "Customer Support",
        "1",
        "Service",
        PRICE_MAP.clientSupport + " €"
      ]] : []),
      ...(formData.maintenance ? [[
        "Maintenance",
        formData.maintenance,
        "1",
        "Service",
        PRICE_MAP[formData.maintenance] + " €"
      ]] : []),
      ...(formData.updateFrequency ? [[
        "Update",
        formData.updateFrequency,
        "1",
        "Service",
        PRICE_MAP[formData.updateFrequency] + " €"
      ]] : []),
      ...formData.languages.map(lang => {
        const langLabel = {
          portugues: "Português",
          ingles: "Inglês",
          frances: "Francês",
          espanhol: "Espanhol"
        }[lang];
        return [
          "Language",
          langLabel,
          "1",
          "Unit",
          PRICE_MAP[lang] + " €"
        ];
      }),
      // ... rest of your itemDetailsRows
    ];

    // Add the table
    doc.autoTable({
      startY: 45,
      head: [['Type', 'Item Name', 'Quantity', 'UOM', 'Price (€)']],
      body: itemDetailsRows,
      foot: [[
        '',
        'Total Amount',
        '',
        '',
        `${total.toFixed(2)} €`
      ]],
      didParseCell: function(data) {
        // Make group header rows (like "Pages") have a light blue background
        if (data.row.cells[0].text === "Pages" || 
            data.row.cells[0].text === "Design" || 
            data.row.cells[0].text === "Type") {
          data.cell.styles.fillColor = [235, 237, 242]; // Light blue-gray
          data.cell.styles.fontStyle = 'bold';
        }
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
      }
    });

    
    

    // Add footer
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

    doc.save("website_quotation.pdf");

  
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
  
      // Geração do PDF após salvar os dados
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.text("Website Quote", 10, 10);
      
      // Client Info
      doc.setFontSize(14);
      doc.text("Client Information:", 20, 30);
      doc.setFontSize(12);
      doc.text("Name: " + dadosOrcamento.informacoesCliente.nome, 20, 40);
      doc.text("Phone: " + dadosOrcamento.informacoesCliente.telefone, 20, 50);
      doc.text("Email: " + dadosOrcamento.informacoesCliente.email, 20, 60);
      
      // Project Details
      doc.setFontSize(14);
      doc.text("Project Details:", 20, 80);
      doc.setFontSize(12);
      doc.text("Website Type: " + dadosOrcamento.detalhesWebsite.tipoWebsite, 20, 90);
      doc.text("Selected Pages: " + (dadosOrcamento.detalhesWebsite.paginas.length > 0 ? dadosOrcamento.detalhesWebsite.paginas.join(", ") : "None selected"), 20, 100);
      
      // Design Services
      doc.text("Design Services: " + (dadosOrcamento.detalhesWebsite.servicosDesign.length > 0 ? dadosOrcamento.detalhesWebsite.servicosDesign.join(", ") : "None selected"), 20, 110);
      
      // Integrations
      doc.text("Social Media Integration: " + dadosOrcamento.detalhesWebsite.redesSociais, 20, 120);
      doc.text("Payment Integration: " + dadosOrcamento.detalhesWebsite.integracaoPagamento, 20, 130);
      doc.text("Product Reviews: " + dadosOrcamento.detalhesWebsite.avaliacaoProdutos, 20, 140);
      
      // Support & Maintenance
      doc.text("Customer Support: " + dadosOrcamento.detalhesWebsite.suporteCliente, 20, 150);
      doc.text("Maintenance Period: " + dadosOrcamento.detalhesWebsite.periodoManutencao, 20, 160);
      doc.text("Update Frequency: " + dadosOrcamento.detalhesWebsite.frequenciaAtualizacao, 20, 170);
      
      // Languages
      doc.text("Website Languages: " + (dadosOrcamento.detalhesWebsite.idiomas.length > 0 ? dadosOrcamento.detalhesWebsite.idiomas.join(", ") : "None selected"), 20, 180);
      
      // Pricing
      doc.setFontSize(16);
      doc.text("Total Quote Amount: " + dadosOrcamento.orcamento.valorTotal + "€", 20, 200);
  
      doc.save("website_quote.pdf");
  
      alert('Orçamento salvo com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar o orçamento. Por favor, tente novamente.');
    }

  };

  
  return (
    <div className="form-container">
      <h2>Formulário para E-commerce</h2>
      <form>
        <label>Nome:</label>
        <input type="text" placeholder="Digite o nome e apelido" required />
        <br />
        <br />
        <label>Telemóvel:</label>
        <input type="text" placeholder="Digite o contacto" required />
        <br />
        <br />
        <label>Email:</label>
        <input type="email" placeholder="Digite o email" required />
        <br />
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
            <option value="novoSite">Novo</option>
            <option value="modernizacao">Modernização</option>
          </select>
        </div>
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
        <br />
        <div>
          <label htmlFor="socialMedia">Integração com redes sociais</label>
          <select
            id="socialMedia"
            name="socialMedia"
            required
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
            required
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
            required
            value={formData.productReviews}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="avaliacaoProdutos">Sim</option>
            <option value="semAvaProd">Não</option>
          </select>
        </div>
        <div>
          <p>Suporte ao cliente</p>
          <div>
           <label htmlFor="clientSupport">Suporte ao cliente</label>
           <select
            id="clientSupport"
            name="clientSupport"
            required
            value={formData.clientSupport}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="suporteYes">Sim</option>
            <option value="suporteNo">Não</option>
          </select>
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="maintenance">Período de manutençao</label>
          <select
            id="maintenance"
            name="maintenance"
            required
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
          <label htmlFor="updateFrequency">Atualização</label>
          <select
            id="updateFrequency"
            name="updateFrequency"
            required
            value={formData.updateFrequency}
            onChange={handleInputChange}
          >
            <option value="">Selecione</option>
            <option value="semanal">Semanal</option>
            <option value="mensal">Mensal</option>
            <option value="trimestral">Trimestral</option>
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
              { value: "outro", label: "Outro" },
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
        <br />
        <button type="submit" onClick={handleSubmit}>PDF Download</button>
      </form>
    </div>
  );
}
