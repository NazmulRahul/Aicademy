import React, { useState, useEffect } from 'react';

const ImageDownloader = ({ imageLink }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(imageLink);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.jpg'; // Replace 'image.jpg' with your desired filename
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError('Failed to download image.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download Image'}
      </button>
      {downloadError && <p>{downloadError}</p>}
    </div>
  );
};

export default ImageDownloader;