import React, { useState } from 'react';
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";


/**
 * A React component that displays a tooltip with content fetched from the background script.
 */
function App() {
  // State to hold the content of the tooltip
  const [content, setContent] = useState("");

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(({ action, text }, sender, sendResponse) => {
    if (action === "update-tooltip-text") {
      setContent(text);
    }
    return true;
  });

  // Render the tooltip with the content or a spinner
  return (
    <ReactTooltip anchorSelect=".summaryHighlight" place="top">
      {content.length > 0
        ? content
        : <img width='100' src={chrome.runtime.getURL('img/svg/spinner.svg')} alt="Loading..." />}
    </ReactTooltip>
  );
}

export default App;
