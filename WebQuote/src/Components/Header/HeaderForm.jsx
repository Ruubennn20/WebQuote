import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logosSemFundo from "../../assets/logosSemFundo.png";


export default function HeaderForm({ currentStep }) {
    return (
        <div className="header-steps">
            <div className="header-content">
                <Link className="home-link" to="/homepage">
                    <img src={logosSemFundo} alt="Logo WebQuote" />
                </Link>
                <div className="steps-container">
                    <div className={`step ${currentStep >= 1 ? 'completed' : ''}`}>
                        <span>Informações Básicas</span>
                    </div>
                    <div className={`step-connector ${currentStep >= 2 ? 'completed' : ''}`}></div>
                    <div className={`step ${currentStep >= 2 ? 'completed' : ''}`}>
                        <span>Detalhes do Web Site</span>
                    </div>
                    <div className={`step-connector ${currentStep >= 3 ? 'completed' : ''}`}></div>
                    <div className={`step ${currentStep >= 3 ? 'completed' : ''}`}>
                        <span>Serviços Adicionais</span>
                    </div>
                    <div className={`step-connector ${currentStep >= 4 ? 'completed' : ''}`}></div>
                    <div className={`step ${currentStep >= 4 ? 'completed' : ''}`}>
                        <span>Finalização</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
