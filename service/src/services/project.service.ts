// src/services/project.service.ts

import { ProductUpdateAction } from '@commercetools/platform-sdk';
import apiRoot from '../client/commercetoolsClient';

export const enableProductSearchIndexing = async () => {
  const getProject = () => {
    return apiRoot
      .get()
      .execute();
  };
  
  // Retrieve Project information and output the result to the log
  getProject()
    .then(console.log)
    .catch(console.error);

  const response = await apiRoot
    .post({
      body: {
        version: 11,
        actions: [
          {
          action: 'changeProductSearchIndexingEnabled',
          enabled: true,
        }
      ]
      },
    })
    .execute();

  return response.body;
};
