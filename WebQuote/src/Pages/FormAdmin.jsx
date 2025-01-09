import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./FormAdmin.css";

export default function FormAdmin() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const storedOrcamentos = JSON.parse(localStorage.getItem('orcamentos') || '[]');
    // Sort orcamentos by date in descending order (newest first)
    const sortedOrcamentos = storedOrcamentos.sort((a, b) => 
      new Date(b.dataSubmissao) - new Date(a.dataSubmissao)
    );
    
    const initialStatusMap = {};
    sortedOrcamentos.forEach((orcamento) => {
      initialStatusMap[orcamento.orderNumber] = orcamento.status || "Aguardando processamento";
    });
    
    setStatusMap(initialStatusMap);
    setOrcamentos(sortedOrcamentos);
    setLoading(false);
  }, []);

  const downloadPDF = async (orderNumber) => {
    const orcamento = orcamentos.find(o => o.orderNumber === orderNumber);
    if (orcamento && orcamento.pdf) {
      const link = document.createElement('a');
      link.href = orcamento.pdf;
      link.download = `orcamento_${orderNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleStatusChange = (orderNumber, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderNumber]: newStatus,
    }));
  };

  const exportToPDF = () => {
    const doc = new jsPDF("landscape");

    // Define columns for the table
    const columns = [
      "Nº Pedido",
      "Nome",
      "Email",
      "Contacto",
      "Tipo de Projeto",
      "Valor Total",
      "Data",
      "Status",
    ];

    // Convert orcamentos data to rows
    const rows = orcamentos.map((orcamento) => [
      orcamento.orderNumber,
      orcamento.informacoesCliente.nome,
      orcamento.informacoesCliente.email,
      orcamento.informacoesCliente.telefone,
      orcamento.detalhesWebsite?.tipoWebsite || orcamento.detalhesApp?.tipoApp || "N/A",
      `${orcamento.orcamento.valorTotal} ${orcamento.orcamento.moeda}`,
      new Date(orcamento.dataSubmissao).toLocaleDateString(),
      statusMap[orcamento.orderNumber] || "Aguardando processamento",
    ]);

    // Add title
    doc.setFontSize(16);
    doc.text("Orçamentos Submetidos", 14, 15);

    // Add table
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 25,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 20 },
    });

    doc.save("orcamentos.pdf");
  };

  const statusOptions = [
    "Aguardando processamento",
    "Em Análise",
    "Aprovado",
    "Em Desenvolvimento",
    "Concluído",
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-container">
      <h2 className=" title">Orçamentos Submetidos</h2>
      <hr className="linha" />
      <div className="table-container" id="exportableTable">
        <table>
          <thead>
            <tr>
              <th>Número do Pedido</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Contacto</th>
              <th>Tipo de Projeto</th>
              <th>Valor Total</th>
              <th>Data Submissão</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orcamentos.map((orcamento) => (
              <tr key={orcamento.orderNumber}>
                <td>{orcamento.orderNumber}</td>
                <td>{orcamento.informacoesCliente.nome}</td>
                <td>{orcamento.informacoesCliente.email}</td>
                <td>{orcamento.informacoesCliente.telefone}</td>
                <td>
                  {orcamento.detalhesWebsite?.tipoWebsite || orcamento.detalhesApp?.tipoApp || "N/A"}
                </td>
                <td>
                  {parseFloat(orcamento.orcamento.valorTotal).toFixed(2)} {orcamento.orcamento.moeda}
                </td>
                <td>
                  {new Date(orcamento.dataSubmissao).toLocaleDateString()}
                </td>
                <td>
                  <select
                    value={statusMap[orcamento.orderNumber] || "Aguardando processamento"}
                    onChange={(e) => handleStatusChange(orcamento.orderNumber, e.target.value)}
                    className="status-select"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => downloadPDF(orcamento.orderNumber)}>
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="export-button-container">
        <button className="export-button" onClick={exportToPDF}>
          Exportar relatório para PDF
        </button>
      </div>
    </div>
  );
}
