import React, { useState, useEffect } from 'react';
import { getQuoteData } from '../http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './FormAdmin.css';  

export default function FormAdmin() {
  const [availableData, setAvailableData] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getQuoteData();
      setAvailableData(data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleStatusChange = (timestamp, newStatus) => {
    setStatusMap((prev) => ({
      ...prev,
      [timestamp]: newStatus,
    }));
  };

  const generateOrderNumber = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  };

  const exportToPDF = async () => {
    const element = document.getElementById('exportableTable');
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('orcamentos.pdf');
  };

  const statusOptions = [
    "Aguardando processamento",
    "Em Análise",
    "Aprovado",
    "Em Desenvolvimento",
    "Concluído"
  ];

  return (
    <div className="container">
      <h1 className="title">Orçamentos Recebidos</h1>
      <button className="export-button" onClick={exportToPDF}>
        Exportar para PDF
      </button>
      <div className="table-container" id="exportableTable">
        <table className="table">
          <thead>
            <tr>
              <th>Nº Orçamento</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Valor Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {availableData.map((orcamento, index) => (
              <tr key={orcamento.timestamp} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td className="order-number">
                  {generateOrderNumber(orcamento.dataSubmissao)}
                </td>
                <td>{orcamento.informacoesCliente.nome || 'Não informado'}</td>
                <td>{orcamento.informacoesCliente.telefone || 'Não informado'}</td>
                <td>{orcamento.informacoesCliente.email || 'Não informado'}</td>
                <td className="total-value">
                  {orcamento.orcamento.valorTotal} {orcamento.orcamento.moeda}
                </td>
                <td>
                  <select
                    value={statusMap[orcamento.timestamp] || "Aguardando processamento"}
                    onChange={(e) => handleStatusChange(orcamento.timestamp, e.target.value)}
                    className="status-select"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
