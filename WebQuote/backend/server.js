const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

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
      pass: 'fvcx modc kdtk lwji'            // Substitua pela sua senha ou App Password
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
