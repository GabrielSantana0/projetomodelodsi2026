import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/routes.api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Uso das rotas
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
