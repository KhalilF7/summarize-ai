import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface ExportButtonProps {
  onExport: (type: string) => void; // callback function for exporting
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  const [selectedOption, setSelectedOption] = useState(''); // state for selected export option

  // function to handle export button click
  const handleExport = () => {
    onExport(selectedOption); // call onExport callback with selected option
    setSelectedOption(''); // reset selected option
  };

  return (
    <div className="export-button">
      {/* dropdown for selecting export option */}
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Export</option>
        <option value="pdf">Export as PDF</option>
        <option value="csv">Export as CSV</option>
        {/* Add more export options here */}
      </select>
      {/* download button that is only shown when an option is selected */}
      {selectedOption && <button onClick={handleExport}><FiDownload /></button>}
    </div>
  );
};

export default ExportButton;
