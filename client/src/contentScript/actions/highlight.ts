import {highlightSelected} from './highlightEngine'
let timeoutId: number | null = null;

/**
 * Highlight selected text and send a message to the background script with the selected text
 *
 * @param selection - The Selection object to be highlighted
 */
 function highlight(selection: Selection | null = window.getSelection()): void {
  if (!selection) return;

  const selectionString: string = selection.toString();
  if (!selectionString) return;

  let container: Node | null = selection.getRangeAt(0).commonAncestorContainer;

  // Sometimes the element will only be text. Get the parent in that case
  // TODO: Is this really necessary?
  while (container && !(container instanceof HTMLElement)) {
      container = container.parentNode;
  }

  if (!container) return;

  // Now we can safely access container.innerHTML
  highlightSelected(selectionString, container, selection);

  // Send a message to the background script with the selected text
  chrome.runtime.sendMessage({
      action: "selectedText",
      text: ""
  }, function (response) {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
  });

  if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
  }
  chrome.runtime.sendMessage({ action:"summaryAPI", text: selectionString },(response)=>{
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
    console.log(response)
    timeoutId = +setTimeout(async () => {
      try {
        // Send the message with the summary text
        chrome.runtime.sendMessage({
          action: "selectedText",
          text: response.summary
        }, function (resp) {
          if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
      });
      } catch (error) {
        console.error(error);
      } finally {
        timeoutId = null;
      }
    }, 100);
  });
}

  
  export { highlight };
  