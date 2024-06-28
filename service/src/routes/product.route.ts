// src/routes/product.route.ts

import { Router } from 'express';
import { getProduct, productSearch, productAvailability } from '../controllers/product.controller';

const router = Router();

router.get('/product/:id', getProduct);
router.get('/product_search', productSearch);
router.get('/product/:id/availability', productAvailability);


export default router;
