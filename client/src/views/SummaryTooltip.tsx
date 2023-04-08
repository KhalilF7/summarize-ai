import React, { useState } from 'react';
import axios from 'axios';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

const SummaryTooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [summary, setSummary] = useState('');

  const handleMouseOver = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      try {
        const response = await axios.post(
          'http://localhost:8000/summarize-ai/message',
          {
            text: selectedText,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setSummary(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <span onMouseOver={handleMouseOver}>
      {children || text}
      {summary && (
        <div style={{ position: 'absolute', zIndex: 1 }}>
          <p>{summary}</p>
        </div>
      )}
    </span>
  );
};

export default SummaryTooltip;
