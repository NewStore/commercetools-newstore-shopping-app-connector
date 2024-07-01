// src/controllers/project.controller.ts

import { Request, Response } from 'express';
import { enableProductSearchIndexing } from '../services/project.service';

export const activateProductSearch = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await enableProductSearchIndexing();
    res.status(200).json(result);
  } catch (error) {
    const typedError = error as Error
    res.status(500).send(`Error enabling product search indexing: ${typedError.message}`);
  }
};
