import { Router } from 'express';

const router = Router();

router.get('/stream', (_req, res) => {
  res.json({ message: 'Streaming endpoint ready' });
});

export default router;
