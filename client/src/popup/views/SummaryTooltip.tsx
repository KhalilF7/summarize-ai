import React, { useState } from 'react';
import axios from 'axios';

interface TooltipProps {
  text: string; // The text to be displayed as a tooltip
  children?: React.ReactNode; // Optional children elements that will be wrapped by the tooltip
}

// Component that displays a tooltip with a summary of selected text
const SummaryTooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [summary, setSummary] = useState<string>(''); // State variable to store the summary text

  // Function that gets called when the user hovers over the wrapped text
  const handleMouseOver = async (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedText = window.getSelection()?.toString(); // Get the selected text from the user's browser window
    if (selectedText) {
      try {
        const response = await axios.post(
          'http://localhost:8000/summarize-ai/message',
          {
            text: selectedText,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Add authentication token to the request headers
            },
          }
        );
        setSummary(response.data); // Set the summary state variable with the response data from the server
      } catch (error) {
        console.log(error); // Log any errors that occur during the server request
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
