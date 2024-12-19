const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Configuração do Multer para salvar o PDF em memória
const upload = multer({ storage: multer.memoryStorage() });

// Middleware para processar JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para enviar e-mail
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const { email } = req.body;
  const pdfBuffer = req.file?.buffer; // Arquivo PDF enviado no FormData

  if (!email || !pdfBuffer) {
    return res.status(400).json({ error: 'E-mail ou arquivo PDF ausente.' });
  }

  // Configuração do Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use seu serviço de e-mail
    auth: {
      user: 'zoroarkchico@gmail.com', // Substitua pelo seu e-mail
      pass: 'fvcx modc kdtk lwji',           // Substitua pela sua senha
    },
  });

  // Configuração do e-mail
  const mailOptions = {
    from: 'franciscomesk@gmail.com',       // Remetente
    to: email,                        // Destinatário
    subject: 'Formulário de Criação de Sites',
    text: 'Segue em anexo o PDF gerado pelo formulário.',
    attachments: [
      {
        filename: 'formulario.pdf',
        content: pdfBuffer, // Envia o PDF como anexo
      },
    ],
  };

  try {
    // Enviar o e-mail
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Falha ao enviar e-mail.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
