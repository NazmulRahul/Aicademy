import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';

const Pdf = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');
  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    console.log(pdfFile)

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3000/test/api/text/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response)
      setText(response.data.text)
      // setPdfData(response.data.pdfData);
      // setNumPages(response.data.numPages);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };
  return (
    <div class="h-screen w-screen bg-gray-400 m-1 ">
      <h1>PDF Text Extractor</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload and Extract</button>
      <div>
        <h2>Extracted Text:</h2>
        <div className="text-container">{text}</div>
      </div>
    </div>
  );
}

export default Pdf;