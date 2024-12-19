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
              "Bem-vindo à nossa empresa! Somos especializados na criação de websites e e-commerces sob medida, 
              com foco em inovação, funcionalidade e design moderno. Nossa missão é transformar ideias em soluções digitais 
              que impulsionem os negócios dos nossos clientes. Como empreendedores em nome individual, valorizamos a proximidade 
              e a personalização no atendimento, garantindo soluções únicas para cada cliente."
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
