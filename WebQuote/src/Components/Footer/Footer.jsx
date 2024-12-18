import "./footer.css";
import Ellipse3 from "../../assets/Ellipse 3.png";

export default function Footer() {
  return (
    <>
      <img src={Ellipse3} alt="ellipse03" className="ellipse03" />
      <footer>
        <div className="footerContainer">
          <div className="footerContent">
            

            <div className="menu">
              <ul className="menu-coluna1">
                <li><a href="#home">Home</a></li>
                <li><a href="#sobre-nos">Sobre Nós</a></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>

              <ul className="menu-coluna2">
                <li><a href="#politica-cookies">Política de Cookies</a></li>
                <li><a href="#politica-privacidade">Política de Privacidade</a></li>
              </ul>

              <ul className="menu-coluna3">
                <li><a href="#livro-reclamacoes">Livro de Reclamações</a></li>
                <li><a href="#perguntas-respostas">Perguntas e Respostas</a></li>
                <li><a href="#termos-servico">Termos de Serviço</a></li>
              </ul>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}
