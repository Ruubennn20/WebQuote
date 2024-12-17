const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');

const app = express();
const upload = multer();

// Rota para enviar o PDF por email
app.post('/send-pdf', upload.single('file'), async (req, res) => {
  const { email } = req.body;
  const pdfFile = req.file;

  // Configuração do nodemailer (use seu email e senha)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seuemail@gmail.com',
      pass: 'suasenha',
    },
  });

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: email,
    subject: 'PDF gerado',
    text: 'Aqui está o PDF que você solicitou.',
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
    res.status(500).send('Erro ao enviar o PDF.');
  }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
