// src/controllers/project.controller.ts

import { Request, Response } from 'express';
import { enableProductSearchIndexing } from '../services/project.service';

export const activateProductSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await enableProductSearchIndexing();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(`Error enabling product search indexing: ${error.message}`);
  }
};
