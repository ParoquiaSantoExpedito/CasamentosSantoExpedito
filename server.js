const express = require('express');
const app = express();

// Seu código...

const PORT = process.env.PORT || 3000; // Pega porta do ambiente!
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
