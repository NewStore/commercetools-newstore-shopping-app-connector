// src/controllers/category.controller.ts

import { Request, Response } from 'express';
import { getAllCategories, buildCategoryTree } from '../services/category.service';

export const getCategoryTree = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllCategories();
    const categoryTree = buildCategoryTree(categories);
    res.status(200).json(categoryTree);
  } catch (error) {
    res.status(500).send(`Error fetching categories: ${error.message}`);
  }
};
