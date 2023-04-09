import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

interface ExportButtonProps {
  onExport: (type: string) => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onExport }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleExport = () => {
    onExport(selectedOption);
    setSelectedOption('');
  };

  return (
    <div className="export-button">
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Export</option>
        <option value="pdf">Export as PDF</option>
        <option value="csv">Export as CSV</option>
        {/* Add more export options here */}
      </select>
      {selectedOption && <button onClick={handleExport}><FiDownload /></button>}
    </div>
  );
};

export default ExportButton;
