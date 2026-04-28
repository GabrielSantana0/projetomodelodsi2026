import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ message: "Hello World! Servidor Node.js com TypeScript rodando." });
});

router.get('/status', (req: Request, res: Response) => {
    res.json({ status: "Rota Ativa", timestamp: new Date() });
});

router.get('/outra-rota', (req: Request, res: Response) => {
    res.json({ message: "Aqui é outra Rota!" });
});

router.post('/register', async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;
    const user = await User.create({ nome, email, senha });
    res.status(201).json({ message: "Usuário criado com sucesso!", id: user.id });
});

export default router;
