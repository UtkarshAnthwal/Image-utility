import './App.css';
import Search from './components/Search';
import ImageCanvas from './components/ImageCanvas';
import { useState } from 'react';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [show, setShow] = useState(false);
  return (
    <div className="App">
    <h1>Image Caption and Shape Editor</h1>
      <Search setShow={setShow} onImageSelect={(imageUrl) => setSelectedImage(imageUrl)} />
      {selectedImage && <ImageCanvas imageUrl={selectedImage} />}
    </div>
  );
}

export default App;
