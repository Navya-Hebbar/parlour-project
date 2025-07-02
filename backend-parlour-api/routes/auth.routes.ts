import express from 'express';
import { login } from '../controllers/auth.controller';

const router = express.Router();
router.post('/login', (req, res, next) => {
  login(req, res).catch(next);
});
export default router;