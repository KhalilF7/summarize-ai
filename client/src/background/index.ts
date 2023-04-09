import {
    toggleHighlighterCursor,
    highlightText,
    tooltip,
    retrieveSummary
  } from './actions/index';
  let token = '';
  chrome.runtime.onMessage.addListener( (request, _sender, sendResponse) => {
    const { action } = request;
  
    // Use a switch statement to handle different actions.
    switch (action) {
      case 'toggle-highlighter-cursor':
        // Call the toggleHighlighterCursor function for the 'toggle-highlighter-cursor' action.
        toggleHighlighterCursor();
        break;
      case 'highlight':
        // Call the highlightText function for the 'highlight' action.
        highlightText();
        break;
      case 'selectedText':
        // Call the tooltip function with the text parameter for the 'selectedText' action.
        tooltip(request.text);
        break;
      case 'summaryAPI':
        // Call the tooltip function with the text parameter for the 'selectedText' action.
        const summary =  retrieveSummary(request.text,sendResponse, token);
        break;
      case 'updateToken':
        token =  request.text;
        break;
      default:
        // Do nothing for unknown actions.
        break;
    }

    return true;
  });