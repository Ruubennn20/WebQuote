import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import './SobreNos.css';
import FotoSobreNos from '../assets/foto_SobreNosCesae.png';

export default function SobreNos() {
  return (
    <>
      <div className="sobrenos-container">
        <Header />
        <div className="sobrenos-content">
          <br />
          <br />
          <h1 className="sobrenos-heading">Sobre Nós</h1>
          <div className="sobrenos-main">
            <img src={FotoSobreNos} alt="Sobre Nós" className="sobrenos-image" />
            <p className="sobrenos-text">
              Bem-vindos! Somos quatro formandos da turma de Frontend Developer do CESAE Digital de São João da Madeira: Ruben Couto, João Pimentel, Bruno Assunção e Francisco Almeida. Juntos, estamos a desenvolver soluções digitais inovadoras, com foco em design moderno e funcionalidade. A nossa missão é criar websites e e-commerces sob medida, aplicando as melhores práticas do mercado para impulsionar os negócios dos nossos clientes. Como uma equipa comprometida com a excelência, valorizamos a proximidade e a personalização no atendimento, garantindo soluções únicas e eficazes para cada cliente.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
