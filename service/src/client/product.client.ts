// src/client/product.client.ts

import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createRequestBuilder } from '@commercetools/api-request-builder';
import { readConfiguration } from '../utils/config.utils';

const client = new ClientBuilder()
  .withProjectKey(process.env.CTP_PROJECT_KEY)
  .withClientCredentialsFlow({
    host: 'https://auth.europe-west1.gcp.commercetools.com',
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: {
      clientId: process.env.CTP_CLIENT_ID,
      clientSecret: process.env.CTP_CLIENT_SECRET,
    },
    scopes: [ readConfiguration().scope
      ? (readConfiguration().scope as string)
      : 'default',],
  })
  .withHttpMiddleware({
    host: 'https://api.europe-west1.gcp.commercetools.com',
    enableRetry: true,
    retryConfig: { maxRetries: 3, retryDelay: 200, backoff: false, retryCodes: [503] },
  })
  .build();

export const getProductById = async (id: string) => {
  const requestBuilder = createRequestBuilder({ projectKey: process.env.CTP_PROJECT_KEY });
  const productService = requestBuilder.products.byId(id).build();

  console.log('Request URI:', productService);


  const response = await client.execute({
    uri: productService,
    method: 'GET',
  });

  return response.body;
};
