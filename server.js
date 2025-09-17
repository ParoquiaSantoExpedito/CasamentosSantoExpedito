const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = path.join(__dirname, 'datas.json');

app.use(express.static(__dirname)); // Serve index.html e arquivos estáticos
app.use(express.json());

function lerEstados() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function salvarEstados(estados) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(estados, null, 2));
}

app.get('/api/estados', (req, res) => {
  res.json(lerEstados());
});

app.post('/api/estado', (req, res) => {
  const { dateStr, novoEstado } = req.body;
  const estados = lerEstados();
  if (novoEstado) {
    estados[dateStr] = novoEstado;
  } else {
    delete estados[dateStr];
  }
  salvarEstados(estados);
  res.json(estados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
