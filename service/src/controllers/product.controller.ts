// src/controllers/product.controller.ts

import { Request, Response } from 'express';
import apiRoot from '../client/commercetoolsClient';
import { searchProducts, getProductAvailability } from '../services/product.service';

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  try {
    const product = await apiRoot
      //.withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY as string })
      //.withId({ ID: productId })
      .products()
      .withKey({key: productId})
      .get()
      .execute();

    res.status(200).json(product.body);
  } catch (error) {
    res.status(500).send(`Error fetching product: ${error.message} for product ${productId}`);
  }
};

export const productSearch = async (req: Request, res: Response): Promise<void> => {
  const { q, cat, sort, ...filters } = req.query;

  try {
    const products = await searchProducts({ q: q as string, cat: cat as string, filters, sort: sort as string });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(`Error searching products: ${error.message}`);
  }
};


export const productAvailability = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const availability = await getProductAvailability(productId);
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).send(`Error fetching product availability: ${error.message}`);
  }
};