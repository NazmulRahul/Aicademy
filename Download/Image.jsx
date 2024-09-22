import React from 'react';
import Down from './Down';

const Image = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/802c8cfb-4008-41ce-b318-dc1af468b354.png?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/aicademy-48d6c.appspot.com/o/802c8cfb-4008-41ce-b318-dc1af468b354.png?alt=media",
  ];

  const imageElements = images.map((imageLink) => (
    <>
        <img src={imageLink} alt="Descriptive image text" />
        <Down props={imageLink}></Down>
    </>
    
  ));

  return (
    <div>
      <h2>Image Section</h2>
      <div>{imageElements}</div>
    </div>
  );
};

export default Image;