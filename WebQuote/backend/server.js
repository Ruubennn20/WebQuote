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
    user: 'geral.webquote@gmail.com', // Substitua pelo seu email
    pass: 'seeg xgxx korg wrvp', // Senha do app ou senha do email
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
    subject: 'Pedido de Orçamento WebQuote',
    html: `
    <p>Caro(a) Cliente,</p>
    <p>Conforme solicitado, segue em anexo o documento em formato PDF.</p>
    <p>Caso necessite de informações adicionais ou de algum ajuste, estou à disposição.</p>
    <p>Agradeço pela atenção e fico no aguardo de qualquer retorno.</p>
    <p>Com os melhores cumprimentos,</p>
    <p><strong>WebQuote</strong></p>
    <img src="cid:logoWebQuote" alt="Logo WebQuote" style="width: 150px;" />
  `,
    attachments: [
      {
        filename: 'website_quotation.pdf', // Nome do arquivo
        content: pdfBuffer, // Conteúdo do PDF
      },
      {
        filename: 'webQuoteLogo.jpg',
        path: '../src/assets/logosSemFundo.png',
        cid: 'logoWebQuote',
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


// Rota para envio do formulário de contato
app.post('/send-contact-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validações básicas
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    // Monta o objeto de email
    const mailOptions = {
      from: 'geral.webquote@gmail.com', // email remetente (o mesmo que está na auth)
      to: 'geral.webquote@gmail.com',   // para quem o email será enviado
      subject: `Contacto de  ${name}`, 
      html: `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email de contato:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    };

    // Envia o email via nodemailer
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Erro ao enviar email.' });
  }
});


// Inicia o servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

