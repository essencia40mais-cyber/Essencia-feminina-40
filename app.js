require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// --- Middlewares ---
app.use(helmet()); // Proteção de cabeçalhos HTTP
app.use(cors());   // Permite requisições de outras origens
app.use(morgan('dev')); // Logger de requisições
app.use(express.json()); // Parsing de JSON no corpo da requisição

// --- Rotas ---
// Exemplo de rota de saúde (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Adicione suas rotas aqui
// app.use('/api/v1', require('./routes/index'));

// --- Tratamento de Erros ---
// Rota 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Recurso não encontrado' });
});

// Middleware de Erro Global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

// --- Iniciar Servidor ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;
