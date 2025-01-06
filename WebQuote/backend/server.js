const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { path } = require('framer-motion/client');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());



// Configuração do nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Pode usar outro provedor ou configuração SMTP
  auth: {
    user: 'zoroarkchico@gmail.com', // Substitua pelo seu email
    pass: 'gijw ncfw ochc fset', // Senha do app ou senha do email
  },
});

// Rota para envio do email
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const { email } = req.body; // Email do destinatário
  const pdfBuffer = req.file?.buffer; // PDF enviado pelo frontend

  if (!email || !pdfBuffer) {
    return res.status(400).json({ error: 'Email ou arquivo PDF ausente.' });
  }

  const mailOptions = {
    from: 'seu-email@gmail.com', // Seu email
    to: email, // Email do destinatário
    subject: 'Seu PDF Gerado',
    text: 'Segue em anexo o PDF gerado.',
    attachments: [
      {
        filename: 'website_quotation.pdf', // Nome do arquivo
        content: pdfBuffer, // Conteúdo do PDF
      },
   
     
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ error: 'Erro ao enviar email.' });
  }
});

// Inicia o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

