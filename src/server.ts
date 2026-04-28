import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/routes.api';
import sequelize from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o MySQL estabelecida com sucesso.');

        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados com o banco de dados.');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error);
    }
}

startServer();
