const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');

const cors = require('cors');
const fs = require('fs/promises');

const path = require('path');

const app = express();
const port = 5000;

// Configuração do Multer para salvar o PDF em memória
const upload = multer({ storage: multer.memoryStorage() });


// Middleware para processar JSON e URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Rota para envio do PDF por email
app.post('/send-pdf', upload.single('file'), async (req, res) => {
    const { email } = req.body; // Email do utilizador
    const pdfFile = req.file;   // Arquivo PDF recebido
  
    console.log('Email recebido:', email);
    console.log('Arquivo recebido:', pdfFile);
  
    if (!email || !pdfFile) {
      return res.status(400).send('Email ou arquivo não fornecido.');
    }


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


// Ensure the orcamento.json file exists
const orcamentoPath = path.join(__dirname, 'orcamento.json');
(async () => {
  try {
    await fs.access(orcamentoPath);
  } catch {
    await fs.writeFile(orcamentoPath, JSON.stringify([], null, 2));
  }
})();

// Route to save form data
app.post('/api/orcamento', (req, res) => {
  try {
    const formData = req.body;
    
    // Add timestamp
    formData.timestamp = new Date().toISOString();
    
    // Read existing data
    const existingData = JSON.parse(fs.readFileSync(orcamentoPath, 'utf8'));
    
    // Add new data
    existingData.push(formData);
    
    // Write back to file
    fs.writeFileSync(orcamentoPath, JSON.stringify(existingData, null, 2));
    
    res.status(200).json({ message: 'Orçamento saved successfully' });
  } catch (error) {
    console.error('Error saving orcamento:', error);
    res.status(500).json({ error: 'Failed to save orcamento' });
  }
});

// Route to get all orcamentos
app.get('/api/orcamentos', (req, res) => {
  try {
    const orcamentos = JSON.parse(fs.readFileSync(orcamentoPath, 'utf8'));
    res.json(orcamentos);
  } catch (error) {
    console.error('Error reading orcamentos:', error);
    res.status(500).json({ error: 'Failed to read orcamentos' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

});





