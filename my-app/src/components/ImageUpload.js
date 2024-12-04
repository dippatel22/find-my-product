// src/components/ImageUpload.js
import React, { useState } from 'react';

function ImageUpload({ onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      onUpload(file); // Pass the file to the parent component for further processing
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onUpload(null); // Clear the image in the parent component
  };

  return (
    <div className="image-upload">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
        style={{ display: 'none' }} 
        id="image-upload-input"
      />
      <label htmlFor="image-upload-input" className="image-upload-label">
        {selectedImage ? (
          <div className="image-preview">
            <img src={selectedImage} alt="Selected" />
            <button type="button" onClick={handleRemoveImage}>
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <p>Click to upload an image</p>
          </div>
        )}
      </label>
    </div>
  );
}

export default ImageUpload;
