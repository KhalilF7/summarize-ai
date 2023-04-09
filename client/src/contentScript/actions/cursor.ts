import { deleteHighlights } from './highlightEngine';

let crayonCursor = false;

/**
 * Highlights the selected text on the webpage
 */
function highlightOnSelection() {
  if (!crayonCursor) return;

  const selection = window.getSelection();
  const selectionString = selection?.toString();

  if (selectionString) { // If there is text selected
    
    chrome.runtime.sendMessage({ action: 'highlight' }, function (response) {
        if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
    }); // Notify the background script to create a highlight
  }
}

/**
 * Initializes the highlighter cursor
 */
function initializeHighlighterCursor() {
  document.addEventListener('mouseup', highlightOnSelection);
}

/**
 * Toggles the highlighter cursor on or off
 */
function toggle() {
  crayonCursor = !crayonCursor;

  if (crayonCursor) {
    // Set the cursor to the crayon icon
    document.body.style.cursor = `url(${chrome.runtime.getURL('img/icons/cursor.png')}), auto`;

    highlightOnSelection(); // Highlight the current selection
  } else {
    deleteHighlights(); // Remove all highlights
    document.body.style.cursor = 'default'; // Reset the cursor to the default
  }
}

function updateState() {
  chrome.runtime.sendMessage({ action: 'cursor-state-update', value: crayonCursor }, (response) => {
    if(chrome.runtime.lastError) console.error(chrome.runtime.lastError);
  });
}

export { toggle, initializeHighlighterCursor, updateState };
