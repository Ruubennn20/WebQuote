import "./Header.css";
import { Link } from "react-router-dom";

export default function HeaderForm({ currentStep }) {
    return (
        <div className="header-steps">
            <Link className="" to="/homepage">Home</Link>
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
                <span>Informações Básicas</span>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
                <span>Detalhes do Web Site</span>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                <span>Serviços Adicionais</span>
            </div>
            <div className={`step ${currentStep === 4 ? 'active' : ''}`}>
                <span>Finalização</span>
            </div>
        </div>
    );
}
