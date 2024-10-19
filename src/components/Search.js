import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onImageSelect, setShow }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]); 
  const searchImages = async () => {
    setShow(true);
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: {
            query: query,
            client_id: 'gkB8QfJfnCbAtqM3ciw2eM8nSgSga_LAJ8wQOwZNue0'
          }
    });
    setImages(response.data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
      />
      <button onClick={searchImages}>Search</button>
      <div className="image-results">
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.urls.small}
              alt={image.alt_description}
              onClick={() => onImageSelect(image.urls.full)}
              style={{ cursor: 'pointer' }}
            />
            <button onClick={() => onImageSelect(image.urls.full)}>
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
