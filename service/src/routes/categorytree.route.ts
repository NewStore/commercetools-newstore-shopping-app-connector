// src/routes/category.route.ts

import { Router } from 'express';
import { getCategoryTree } from '../controllers/categorytree.controller';

const router = Router();

router.get('/category/tree', getCategoryTree);

export default router;
