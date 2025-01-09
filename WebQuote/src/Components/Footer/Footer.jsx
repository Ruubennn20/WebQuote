import "./footer.css";
import Ellipse3 from "../../assets/Ellipse 3.png";
import WebQuoteLogo from "../../assets/webQuoteLogo.jpg"; // Adicionando a importação da imagem
import { Link } from "react-router-dom";

// Importação correta das imagens dos cards
import card1 from "../../assets/card1.jpg";
import card2 from "../../assets/card2.jpg";

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="extra-images">
        <img src={card2} alt="card 2" className="extra-image2" />
        <img src={card1} alt="card 1" className="extra-image1" />
      </div>
      
      <div className="footer-curve">
        <footer>
          <div className="footerContainer">
            <div className="footerContent">
              <div className="footer-sections">
                <div className="footer-section">
                  <h4>Navegação</h4>
                  <ul className="menu-coluna1">
                    <li className="HomeFooter"><Link to="/">Home</Link></li>
                    <li className="SobreNosFooter"><Link to="/sobre-nos">Sobre Nós</Link></li>
                    <li className="ContactosFooter"><Link to="/contactos">Contactos</Link></li>
                  </ul>
                </div>

                <div className="footer-section">
                  <h4>Serviços</h4>
                  <ul className="menu-coluna2">
                    <li><Link to="/form-admin">Orçamento Website</Link></li>
                    <li><Link to="/form-admin">Orçamento App</Link></li>
                  </ul>
                </div>

                <div className="footer-section">
                  <h4>Legal / Suporte</h4>
                  <ul className="menu-coluna3">
                    <li className="CookiesFooter">
                      <Link to="/politica-cookies">Política de Cookies</Link>
                    </li>
                    <li className="ReclamacoesFooter">
                      <a href="https://www.livroreclamacoes.pt/Inicio/" 
                         target="_blank" 
                         rel="noopener noreferrer">
                        Livro de Reclamações
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Contacto</h4>
                  <ul className="menu-coluna5">
                    <li>
                      <a href="mailto:info@webquote.pt">info@webquote.pt</a>
                    </li>
                    <li>
                      <a href="tel:+351912345678">+351 912 345 678</a>
                    </li>
                    <li>
                      <address>
                        São João da Madeira<br />
                        Portugal
                      </address>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="footer-bottom">
                <div className="footer-logo">
                  <img src={WebQuoteLogo} alt="Logo WebQuote" className="footerLogoImage" />
                </div>
                <div className="social-links">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <div className="copyright">
                  © 2025 WebQuote. Todos os direitos reservados.
                  <br />
                  Desenvolvido por Ruben Couto, João Pimentel, Francisco Almeida e Bruno Assunção.
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}