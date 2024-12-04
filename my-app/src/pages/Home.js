// src/pages/Home.js
import React, { useState } from 'react';
import ImageUpload from '../components/ImageUpload';
import { recognizeImage } from '../services/imageRecognition';
import { fetchAllProducts } from '../services/allAPI';

function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [labels, setLabels] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setUploadedImage(file);
    setLabels([]);
    setProducts([]);
    setError(null);

    if (file) {
      setLoading(true);
      try {
        const recognizedLabels = await recognizeImage(file);
        setLabels(recognizedLabels);
        // Use the first recognized label for simplicity
        const products = await fetchAllProducts(recognizedLabels[0]);
        setProducts(products);
      } catch (error) {
        setError('Failed to recognize the image or fetch products.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Welcome to Our Product Search Site</h1>
      <ImageUpload onUpload={handleImageUpload} />
      {uploadedImage && (
        <div>
          <h2>Image Preview:</h2>
          <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {products.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                <p>{product.name}</p>
                <p>Price: ${product.price}</p>
                <p>Source: {product.source}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
