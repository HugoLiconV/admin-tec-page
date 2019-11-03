import React from 'react';

const ImageViewer = ({image}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 400
      }}
    >
      <img
        alt="Imagen de noticia"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain'
        }}
        src={image}
      />
    </div>
  );
};

export default ImageViewer;