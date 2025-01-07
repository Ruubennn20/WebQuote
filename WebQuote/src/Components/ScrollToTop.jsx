import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation(); // Obtém a URL atual

  useEffect(() => {
    window.scrollTo(0, 0); // Rola para o topo da página
  }, [pathname]); // Executa sempre que a rota (URL) mudar

  return null; // Este componente não renderiza nada
}
