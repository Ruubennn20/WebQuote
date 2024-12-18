import React, { useState } from "react";
import "./form.css";
import { jsPDF } from "jspdf";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;

    //custo Website
    total += PRICE_MAP[formData.objective] || 0;

    //Custo de paginas
    formData.pages.forEach((page) => {
      total += PRICE_MAP[page] || 0;
    });

    //Custo de manutençao
    if (formData.maintenance) {
      total += PRICE_MAP[formData.maintenance] || 0;
    }

    //Conteudo PDF
    const doc = new jsPDF();
    //Conteudo
       // Header
   doc.setFontSize(20);
   doc.text("Website Quote", 10, 10);
    // Client Info
   doc.setFontSize(14);
   doc.text("Client Information:", 20, 30);
   doc.setFontSize(12);
   doc.text("Name: " + document.querySelector('input[placeholder="Digite o nome e apelido"]').value, 20, 40);
   doc.text("Phone: " + document.querySelector('input[placeholder="Digite o contacto"]').value, 20, 50);
   doc.text("Email: " + document.querySelector('input[placeholder="Digite o email"]').value, 20, 60);
    // Project Details
   doc.setFontSize(14);
   doc.text("Project Details:", 20, 80);
   doc.setFontSize(12);
   doc.text("Website Type: " + (formData.objective === "novoSite" ? "New Website" : "Modernization"), 20, 90);
   doc.text("Selected Pages: " + (formData.pages.length > 0 ? formData.pages.join(", ") : "None selected"), 20, 100);
   
   // Design Services
   doc.line(20, 100, 300, 100);

   doc.text("Design Services: " + (formData.designServices.length > 0 ? formData.designServices.join(", ") : "None selected"), 20, 110);
   
   // Integrations
   doc.line(20, 100, 200, 100);
   doc.text("Social Media Integration: " + (formData.socialMedia === "socialMedia" ? "Yes" : "No"), 20, 120);
   doc.text("Payment Integration: " + (formData.paymentIntegration === "paymentIntegration" ? "Yes" : "No"), 20, 130);
   doc.text("Product Reviews: " + (formData.productReviews === "avaliacaoProdutos" ? "Yes" : "No"), 20, 140);
   
   // Support & Maintenance
   doc.text("Customer Support: " + (formData.clientSupport === "suporteYes" ? "Yes" : "No"), 20, 150);
   doc.text("Maintenance Period: " + (formData.maintenance || "Not selected"), 20, 160);
   doc.text("Update Frequency: " + (formData.updateFrequency === "semanal" ? "Weekly" : formData.updateFrequency === "mensal" ? "Monthly" : formData.updateFrequency === "trimestral" ? "Quarterly" : "Not selected"), 20, 170);
   
   // Languages
   doc.text("Website Languages: " + (formData.languages.filter(p => ["portugues", "ingles", "frances", "espanhol", "outro"].includes(p)).join(", ") || "None selected"), 20, 180);
    // Pricing
   doc.setFontSize(16);
   doc.text("Total Quote Amount: " + (total.toFixed(2) + "€"), 20, 200);
   
   doc.save("website_quote.pdf");
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
          <label htmlFor="maintenance">Período de manutenção</label>
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
