// src/services/eCommerceAPI.js
import { fetchAmazonProducts, fetchEbayProducts } from './eCommerceAPI';

export const fetchAllProducts = async (query) => {
  const amazonProducts = await fetchAmazonProducts(query);
  const ebayProducts = await fetchEbayProducts(query);
  
  // Combine all products into one array
  const allProducts = [...amazonProducts, ...ebayProducts];
  
  // Sort products by price (assuming each product has a `price` property)
  return allProducts.sort((a, b) => a.price - b.price);
};
