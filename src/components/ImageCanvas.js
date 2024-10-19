import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const ImageCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const imageRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Initialize the fabric canvas
    const canvas = new fabric.Canvas(canvasRef.current);
    fabricCanvasRef.current = canvas;

    console.log('Canvas initialized:', canvas); // Log canvas initialization

    // Clear the canvas when the component unmounts
    return () => {
      canvas.dispose();
      console.log('Canvas disposed'); // Log canvas disposal
    };
  }, []);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (canvas && imageUrl) {
      // Clear the canvas before loading the new image
      console.log('Clearing canvas'); // Log canvas clearing
      canvas.clear();

      // Load the image onto the canvas with scaling
      fabric.Image.fromURL(imageUrl, (img) => {
        console.log('Image loaded:', img); // Log the loaded image

        const maxWidth = 400;
        const maxHeight = 300;
        const scaleX = maxWidth / img.width;
        const scaleY = maxHeight / img.height;
        const scale = Math.min(scaleX, scaleY);

        console.log('Image scale:', scale); // Log the image scale

        img.scale(scale);
        img.set({
          left: (canvas.width - img.getScaledWidth()) / 2,
          top: (canvas.height - img.getScaledHeight()) / 2,
          selectable: true,
        });
        canvas.add(img);
        canvas.sendToBack(img);

        // Store the image reference for later use
        imageRef.current = img;

        // Create a circular mask with a fixed radius and store it in the ref
        const circleRadius = 1000; // Hardcoded radius for a larger circle
        const circle = new fabric.Circle({
          radius: circleRadius,
          left: (canvas.width - circleRadius * 2) / 2,
          top: (canvas.height - circleRadius * 2) / 2,
          selectable: false, // Make the circle non-selectable
          evented: false, // Prevent events on the circle
        });

        console.log('Circle created with hardcoded radius:', circle); // Log circle creation
        circleRef.current = circle;

        // Render the canvas to apply the changes
        canvas.renderAll();
        console.log('Canvas rendered'); // Log canvas rendering
      }, { crossOrigin: 'anonymous' });
    }
  }, [imageUrl]); // Only run when imageUrl changes

  // Change the image to a circular shape
  const changeImageToCircle = () => {
    const canvas = fabricCanvasRef.current;
    const image = imageRef.current;
    const circle = circleRef.current;

    if (image && circle) {
      console.log('Applying circle as clipPath'); // Log clipping application

      // Apply the circle as the clipPath
      image.set({
        clipPath: circle, // Apply circular clip path to the image
      });

      // Render the canvas to apply the changes
      canvas.renderAll();
      console.log('Image clipped to circle'); // Log successful clipping
    } else {
      console.log('Image or Circle is missing'); // Log missing references
    }
  };

  // Add text to the canvas
  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      console.log('Adding text'); // Log text addition
      const text = new fabric.Textbox('Add Caption Here', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fill: 'black', // Set text color
      });
      canvas.add(text);
      canvas.setActiveObject(text); // Set text as active for manipulation
    }
  };

  // Download the canvas image
  const downloadImage = () => {
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      console.log('Downloading image'); // Log download action
      // Use toDataURL to generate the image data URL
      const dataUrl = canvas.toDataURL({ format: 'png' });

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'modified_image.png'; // Set the default file name
      document.body.appendChild(link); // Append link to body (required for Firefox)

      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the DOM
    }
  };

  return (
    <div>
      <div>
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          style={{ border: '1px solid black' }}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={addText} style={{ marginRight: '10px' }}>
          Add Text
        </button>
        <button onClick={changeImageToCircle} style={{ marginRight: '10px' }}>
          Change Image to Circle
        </button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
    </div>
  );
};

export default ImageCanvas;