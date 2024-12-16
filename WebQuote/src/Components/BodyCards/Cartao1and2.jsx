import React from "react"; 
import "./Cards.css";
import Vector1 from "../../assets/Vector1.png";
import imgCard1 from "../../assets/imgCard1.png";
import imgCard2 from "../../assets/imgCard2.png";



export default function Cartao1and2() {
  return (
    <>
    <div className="cards-container">
      <div className="card-content">
        <div className="text-section">
          <h2 className="card-title02">Escolher a WebQuote ?</h2>
          <h3 className="card-subtitle02">Nossos orçamentos</h3>
          <p className="card-text02">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum has been the 
            typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s. 
            When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
            unchanged.
          </p>
        </div>
        <div className="image-section">
          <div className="image-stack">
            <img src={Vector1} alt="Vector1" className="background-shape" />
            <div className="image-container">
              <img src={imgCard1} alt="Business" className="card-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* alterar o texto para a direita e imagem para a esquerda */}
     <div className="cards-container02">
     <div className="card-content02">
       <div className="text-section">
         <h2 className="card-title">Escolher a WebQuote ?</h2>
         <h3 className="card-subtitle">Nossos orçamentos</h3>
         <p className="card-text">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem Ipsum has been the 
           typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s. 
           When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
           survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
           unchanged.
         </p>
       </div>
       <div className="image-section">
         <div className="image-stack">
           <img src={Vector1} alt="Vector1" className="background-shape" />
           <div className="image-container">
             <img src={imgCard1} alt="Business" className="card-image" />
           </div>
         </div>
       </div>
     </div>
   </div>
   </>
  );
}
