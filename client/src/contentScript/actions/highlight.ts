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

      // timeoutId = +setTimeout(async () => {
    //   try {
    //     // Retrieve the token from storage
    //     const token = await new Promise<string>((resolve, reject) => {
    //       chrome.storage.local.get('token', (result) => {
    //         if (chrome.runtime.lastError) {
    //           reject(chrome.runtime.lastError);
    //         } else {
    //           resolve(result.token);
    //         }
    //       });
    //     });
        
    //     // Call API and wait for the result
    //     const result = await fetch('https://example.com/api', {
    //       method: 'POST',
    //       body: JSON.stringify({ selectionString }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
        
    //     // Extract the result as text
    //     const textResult = await result.text();
  
    //     // Send the message with the result
    //     chrome.runtime.sendMessage({
    //       action: "selectedText",
    //       text: textResult
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     timeoutId = null;
    //   }
    // }, 100);


  timeoutId = +setTimeout(() => {
      chrome.runtime.sendMessage({
          action: "selectedText",
          text: selectionString
      }, function (response) {
        if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
    });
      timeoutId = null;
  }, 5000);
}

  
  export { highlight };
  