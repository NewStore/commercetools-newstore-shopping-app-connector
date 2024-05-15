// src/controllers/product.controller.ts

import { Request, Response } from 'express';
import apiRoot from '../client/commercetoolsClient';

export const getProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;

  // const getProject = () => {
  //   return apiRoot
  //     .get()
  //     .execute();
  // };
  
  // // Retrieve Project information and output the result to the log
  // getProject()
  //   .then(console.log)
  //   .catch(console.error);

  try {
    const product = await apiRoot
      //.withProjectKey({ projectKey: process.env.CTP_PROJECT_KEY as string })
      .products()
      //.withId({ ID: productId })
      .withKey({key: productId})
      .get()
      .execute();

    res.status(200).json(product.body);
  } catch (error) {
    res.status(500).send(`Error fetching product: ${error.message} for product ${productId}`);
  }
};
