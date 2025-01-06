// server.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();

// Habilita CORS
app.use(cors());
// Permite receber JSON no body
app.use(express.json());

// Configuração do serviço de e-mail (Exemplo: Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SEU_EMAIL@gmail.com',
    pass: 'SUA_SENHA' // ideal usar senha de App, não a senha "normal"
  }
});

// Rota para gerar PDF e enviar por e-mail
app.post('/gerar-pdf-enviar-email', (req, res) => {
  const { emailDoUsuario, dadosPDF } = req.body;
  
  // Cria um novo documento PDF
  const doc = new PDFDocument();

  // Caminho temporário para salvar o PDF
  // Poderia usar algo como 'saida-{DataHora}.pdf' para evitar conflito
  const filePath = path.join(__dirname, 'saida.pdf');
  const writeStream = fs.createWriteStream(filePath);
  
  doc.pipe(writeStream);

  // Conteúdo do PDF
  doc.fontSize(18).text('PDF Gerado via Node.js', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Nome: ${dadosPDF.nome}`);
  doc.fontSize(14).text(`Mensagem: ${dadosPDF.mensagem}`);

  // Finaliza o PDF
  doc.end();

  // Quando terminar de escrever o PDF, envia o e-mail
  writeStream.on('finish', async () => {
    try {
      // Opções de envio do e-mail
      const mailOptions = {
        from: 'SEU_EMAIL@gmail.com',
        to: emailDoUsuario,
        subject: 'Seu PDF chegou!',
        text: 'Segue em anexo o PDF gerado pelo servidor Node.js.',
        attachments: [
          {
            filename: 'saida.pdf',
            path: filePath
          }
        ]
      };

      // Envia o e-mail
      await transporter.sendMail(mailOptions);

      // Remove o PDF temporário (boa prática)
      fs.unlinkSync(filePath);

      return res.status(200).json({ message: 'PDF gerado e e-mail enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar o e-mail:', error);
      return res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.' });
    }
  });

  // Se der algum erro ao criar o PDF
  writeStream.on('error', (error) => {
    console.error('Erro ao criar PDF:', error);
    return res.status(500).json({ error: 'Ocorreu um erro ao gerar o PDF.' });
  });
});

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
