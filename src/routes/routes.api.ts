import { Router, Request, Response } from 'express';

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

export default router;
