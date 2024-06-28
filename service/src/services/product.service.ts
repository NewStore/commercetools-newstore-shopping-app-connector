// src/services/product.service.ts

import apiRoot from '../client/commercetoolsClient';

interface ProductSearchParams {
  q?: string;
  cat?: string;
  filters?: Record<string, string>;
  sort?: string;
}

export const searchProducts = async (params: ProductSearchParams) => {
  const query: any = {};
  if (params.q) {
    // TODO, doesnt work
    query['text.en-GB'] = params.q;  // Specify the language component here
    // query['filter.query'] = `searchKeywords.en: "${params.q}"`;
  }

  if (params.cat) {
    query.filter = [`categories.id:subtree("${params.cat}")`];
  }

  if (params.filters) {
    for (const [filter, value] of Object.entries(params.filters)) {
      if (filter.includes('range')) {
        const [min, max] = value.split(',');
        const attribute = filter.split(':')[0];
        query.filter = [...(query.filter || []), `${attribute}:range (${min} to ${max})`];
      } else if (filter.includes('in')) {
        const values = value.split('|').map(val => `"${val}"`).join(',');
        const attribute = filter.split(':')[0];
        query.filter = [...(query.filter || []), `${attribute}:in (${values})`];
      }
    }
  }


  if (params.sort) {
    query.sort = params.sort;
  }
  // console.log({ queryArgs: query })
  const response = await apiRoot
    .productProjections()
    .search()
    .get({ queryArgs: query, 'fuzzy' : true })
    .execute();

  return response.body.results.map(product => ({
    details_id: product.id,
    display_id: product.masterVariant?.sku || product.id,
  }));
};



export const getProductAvailability = async (productId: string) => {
  const response = await apiRoot
    .productProjections()
    .withId({ ID: productId })
    .get()
    .execute();

  const product = response.body;

  if (!product) {
    throw new Error('Product not found');
  }

  const availability = product.masterVariant.availability;

  return {
    productId: product.id,
    availableQuantity: availability?.availableQuantity || 0,
    isOnStock: availability?.isOnStock || false,
  };
};