import { Router, Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { constAuthMiddleware } from '../middleware/authMiddleware';

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

router.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(senha, user.senha)) {
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.SECRET_KEY as string, { expiresIn: '30d' });
        return res.json({ auth: true, token });
    }

    res.status(401).json({ message: "Credenciais inválidas" });
});

router.get('/perfil', constAuthMiddleware, (req, res) => {
    res.json({
        message: "Acesso autorizado",
        userId: req.user?.id
    });
});

export default router;
