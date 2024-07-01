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
    const typedError = error as Error
    res.status(500).send(`Error fetching product: ${typedError.message} for product ${productId}`);
  }
};

export const productSearch = async (req: Request, res: Response): Promise<void> => {
  const { q, cat, sort, ...filters } = req.query;
  
  // Transform filters to match the expected type Record<string, string>
  const transformedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(key => {
    const value = filters[key];
    if (typeof value === 'string') {
      transformedFilters[key] = value;
    } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
      transformedFilters[key] = value.join(',');
    }
  });
  try {
    const products = await searchProducts({ q: q as string, cat: cat as string, filters: transformedFilters, sort: sort as string });
    res.status(200).json(products);
  } catch (error) {
    const typedError = error as Error
    res.status(500).send(`Error searching products: ${typedError.message}`);
  }
};


export const productAvailability = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  try {
    const availability = await getProductAvailability(productId);
    res.status(200).json(availability);
  } catch (error) {
    const typedError = error as Error
    res.status(500).send(`Error fetching product availability: ${typedError.message}`);
  }
};