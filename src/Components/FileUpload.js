import React from 'react';
import Papa from 'papaparse';

const FileUpload = ({ setData }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    }
  };

  return (
    <div>
      <label htmlFor="csv-file">Upload a CSV file:</label>
      <input type="file" id="csv-file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
