import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./FormAdmin.css";

export default function FormAdmin() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const fetchOrcamentos = async () => {
    try {
      const response = await fetch("http://localhost:3000/orcamento");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const initialStatusMap = {};
      data.forEach((orcamento) => {
        initialStatusMap[orcamento.orderNumber] =
          orcamento.status || "Aguardando processamento";
      });
      setStatusMap(initialStatusMap);
      setOrcamentos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const downloadPDF = async (orderNumber) => {
    try {
      const response = await fetch(
        `http://localhost:3000/${orderNumber}/pdf`
      );
      if (!response.ok) throw new Error("Failed to fetch PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orcamento_${orderNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
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
      "Tipo Website",
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
      orcamento.detalhesWebsite.tipoWebsite,
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
              <th>Tipo Website</th>
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
                <td>{orcamento.detalhesWebsite.tipoWebsite}</td>
                <td>
                  {orcamento.orcamento.valorTotal} {orcamento.orcamento.moeda}
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
