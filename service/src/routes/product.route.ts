// src/routes/product.route.ts

import { Router } from 'express';
import { getProduct } from '../controllers/product.controller';

const router = Router();

router.get('/product/:id', getProduct);

export default router;
