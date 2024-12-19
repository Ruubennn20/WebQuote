const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const upload = multer(); // Middleware para processar arquivos

app.use(cors());
app.use(express.json());

// Rota para envio do PDF por email
app.post('/send-pdf', upload.single('file'), async (req, res) => {
    const { email } = req.body; // Email do utilizador
    const pdfFile = req.file;   // Arquivo PDF recebido
  
    console.log('Email recebido:', email);
    console.log('Arquivo recebido:', pdfFile);
  
    if (!email || !pdfFile) {
      return res.status(400).send('Email ou arquivo não fornecido.');
    }

  // Configuração do transporte Nodemailer (Gmail ou SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zoroark.email@gmail.com', // Substitua pelo seu email
                 // Substitua pela sua senha ou App Password
    },
  });

  const corsOptions = {
    origin: 'http://localhost:3000', // Garanta que é a origem do seu frontend
    methods: 'POST,GET,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  };
  
  app.use(cors(corsOptions));
  

  const mailOptions = {
    from: 'zoroark.email@gmail.com',
    to: email,
    subject: 'PDF do Formulário',
    text: 'Segue em anexo o PDF gerado.',
    attachments: [
      {
        filename: pdfFile.originalname,
        content: pdfFile.buffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('PDF enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
    res.status(500).send('Erro ao enviar o email.');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});





