import Header from "../Components/Header/Header";
import Body from "../Components/Body/Body";
import Cartao1and2 from "../Components/BodyCards/Cartao1and2";
import Footer from "../Components/Footer/Footer";
import "./Homepage.css"; // Adicionando um arquivo CSS para ajustar o espaçamento

export default function Homepage() {
  return (
    <>
      <Header />
      <Body />
      <div className="cartao-spacing">
      <Cartao1and2 />
      </div>
      <div className="footerHomePage">
      <Footer />
      </div>
      </>
  );
}
