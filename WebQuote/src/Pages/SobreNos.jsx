import React from 'react';
import Header from '../Components/Header/Header';
import Footer2 from '../Components/Footer/Footer2';
import './SobreNos.css';
import teamImage from '../assets/foto_SobreNosCesae.png';

export default function SobreNos() {
  return (
    <>
      <div className="sobrenos-container">
        <Header />
        <div className="sobrenos-content">
          
          <h1 className="sobrenos-heading">Sobre a WebQuote</h1>
          <div className="sobrenos-main">
            <img src={teamImage} alt="Equipe WebQuote" className="sobrenos-image" />
            <div className="sobrenos-text">
              <h2>Nossa História</h2>
              <p className="sobrenos-text">
              Bem-vindos! Somos quatro formandos da turma de Frontend Developer do CESAE Digital de São João da Madeira:
               Ruben Couto, João Pimentel, Bruno Assunção e Francisco Almeida. Juntos, estamos a desenvolver soluções 
               digitais inovadoras, com foco em design moderno e funcionalidade. A nossa missão é criar websites
                e APP sob medida, aplicando as melhores práticas do mercado para impulsionar os negócios dos nossos 
                clientes. Como uma equipa comprometida com a excelência, valorizamos a proximidade e a personalização 
                no atendimento, garantindo soluções únicas e eficazes para cada cliente.
            </p>
            </div>
            </div>
            <br />
            <div className="sobrenos-main">
            <div className="sobrenos-text">

              <h2>Nossa Missão</h2>
              <p>
                Nosso compromisso é fornecer orçamentos precisos e detalhados para projetos digitais, 
                ajudando empresas e empreendedores a planejarem seus investimentos em tecnologia de 
                forma mais eficiente e consciente.
              </p>

              <h2>Nossa Abordagem</h2>
              <p>
                Utilizamos uma metodologia única que combina anos de experiência em desenvolvimento 
                com análise de dados do mercado. Isso nos permite oferecer estimativas realistas e 
                detalhadas para cada projeto, considerando todos os aspectos técnicos e criativos 
                necessários.
              </p>

              <h2>Nossos Valores</h2>
              <ul>
                <li>Transparência em todas as etapas do processo</li>
                <li>Compromisso com a qualidade e precisão</li>
                <li>Inovação constante em nossas soluções</li>
                <li>Foco nas necessidades específicas de cada cliente</li>
              </ul>

              <h2>Por Que Escolher a WebQuote?</h2>
              <p>
                Nossa plataforma oferece orçamentos instantâneos e personalizados, baseados em 
                parâmetros reais do mercado. Com a WebQuote, você tem acesso a:
              </p>
              <ul>
                <li>Estimativas detalhadas e transparentes</li>
                <li>Opções personalizáveis para cada tipo de projeto</li>
                <li>Suporte especializado em cada etapa</li>
                <li>Tecnologia de ponta para cálculos precisos</li>
              </ul>
            </div>
            </div>
          </div>
        </div>
        <Footer2 />
    </>
  );
}
