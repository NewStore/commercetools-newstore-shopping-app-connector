// src/routes/project.route.ts

import { Router } from 'express';
import { activateProductSearch } from '../controllers/project.controller';

const router = Router();

router.post('/activate-product-search', activateProductSearch);

export default router;
