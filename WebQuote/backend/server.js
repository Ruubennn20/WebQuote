const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração dos caminhos
const orcamentoPath = path.join(__dirname, 'orcamento.json');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() });

// Ensure the orcamento.json file exists
(async () => {
  try {
    await fs.access(orcamentoPath);
  } catch {
    await fs.writeFile(orcamentoPath, JSON.stringify([], null, 2));
  }
})();

// Rotas
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const { email } = req.body;
  const pdfBuffer = req.file?.buffer;

  if (!email || !pdfBuffer) {
    return res.status(400).json({ error: 'E-mail ou arquivo PDF ausente.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zoroarkchico@gmail.com',
      pass: 'fvcx modc kdtk lwji',
    },
  });

  const mailOptions = {
    from: 'franciscomesk@gmail.com',
    to: email,
    subject: 'Formulário de Criação de Sites',
    text: 'Segue em anexo o PDF gerado pelo formulário.',
    attachments: [
      {
        filename: 'formulario.pdf',
        content: pdfBuffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Falha ao enviar e-mail.' });
  }
});

app.post('/api/orcamento', async (req, res) => {
  try {
    const formData = req.body;
    formData.timestamp = new Date().toISOString();
    
    const data = await fs.readFile(orcamentoPath, 'utf8');
    const existingData = JSON.parse(data);
    existingData.push(formData);
    
    await fs.writeFile(orcamentoPath, JSON.stringify(existingData, null, 2));
    res.status(200).json({ message: 'Orçamento saved successfully' });
  } catch (error) {
    console.error('Error saving orcamento:', error);
    res.status(500).json({ error: 'Failed to save orcamento' });
  }
});

app.get('/api/orcamento', async (req, res) => {
  try {
    const data = await fs.readFile(orcamentoPath, 'utf8');
    const orders = JSON.parse(data);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Erro ao carregar os pedidos:", error);
    res.status(500).json({ message: "Erro ao carregar os pedidos." });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "404 - Não encontrado." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



