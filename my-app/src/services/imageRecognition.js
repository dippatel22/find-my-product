// src/services/imageRecognition.js
import axios from 'axios';

const API_KEY = 'your api key'; // Replace with your actual API key
const VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export const recognizeImage = async (imageFile) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const imageBase64 = reader.result.split(',')[1]; // Get the base64 string of the image
      const requestBody = {
        requests: [
          {
            image: { content: imageBase64 },
            features: [{ type: 'LABEL_DETECTION', maxResults: 5 }],
          },
        ],
      };

      try {
        const response = await axios.post(VISION_API_URL, requestBody);
        const labels = response.data.responses[0].labelAnnotations.map((label) => label.description);
        resolve(labels);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imageFile); // Convert image file to base64
  });
};
