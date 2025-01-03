import "./footer.css";
import Ellipse3 from "../../assets/Ellipse 3.png";
import WebQuoteLogo from "../../assets/webQuoteLogo.jpg"; // Adicionando a importação da imagem
import { Link } from "react-router-dom";

// Importação correta das imagens dos cards
import card1 from "../../assets/card1.jpg";
import card2 from "../../assets/card2.jpg";

export default function Footer() {
  return (
    <>
      {/* Container para as imagens dos cards */}
      <div className="extra-images">
        <img src={card2} alt="card 2" className="extra-image2" />
        <img src={card1} alt="card 1" className="extra-image1" />
      </div>

      <img src={Ellipse3} alt="ellipse03" className="ellipse03" />
      <footer>
        <div className="footerContainer">
          <div className="footerContent">
            <div className="menu">
              <ul className="menu-coluna1">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/sobre-nos">Sobre Nós</Link></li>
                <li><Link to="/contactos">Contactos</Link></li>
              </ul>
              <ul className="menu-coluna2">
              <li><Link to="/politica-cookies">Política de Cookies</Link></li>
                <li><a href="#politica-privacidade">Política de Privacidade</a></li>
              </ul>
              <ul className="menu-coluna3">
                <li>
                  <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer">
                    Livro de Reclamações
                  </a>
                </li>
                <li><a href="#perguntas-respostas">Perguntas e Respostas</a></li>
                <li><a href="#termos-servico">Termos de Serviço</a></li>
              </ul>
            </div>
            <div className="footer-logo">
              <img src={WebQuoteLogo} alt="Logo WebQuote" className="footerLogoImage" />
            </div>
            <div className="copyright">
              © 2025 Ruben Couto, João Pimentel, Francisco Almeida e Bruno Assunção. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
