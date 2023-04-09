const HIGHLIGHT_CLASS = 'summaryHighlight';

interface HighlightInfo {
    color: string;
    textColor: string;
    highlightIndex: number;
    selectionString: string;
    anchor: JQuery<HTMLElement>;
    anchorOffset: number;
    focus: JQuery<HTMLElement>;
    focusOffset: number;
  }

/**
 * Deletes all highlights by replacing them with their original text content
 * 
 * @returns a Promise that resolves when all highlights have been deleted
 */
 async function deleteHighlights(): Promise<void> {
  return new Promise((resolve) => {
    const highlighted = $(".summaryHighlight"); // Get all elements with class "summaryHighlight"
    const totalHighlighted = highlighted.length; // Count the number of highlighted elements
    let count = 0;

    // If there are any highlighted elements, iterate over them and replace their content
    if (totalHighlighted > 0) {
      highlighted.each( (index, element) => {
        const parent = $(element).parent(); // Get the parent element of the highlighted element
        let text = "";

        // Iterate over all child nodes of the parent element and construct the original text content
         new Promise<void>((innerResolve) => {
          parent.contents().each(function () {
            if (this.nodeType === Node.TEXT_NODE) {
              text += this.textContent;
            } else if ($(this).is(".highlight")) {
              text += $(this).text();
            } else {
              text += $(this).html();
            }

            innerResolve();
          });
        }).then(async ()=>{
            // Replace the content of the parent element with the original text content
            await parent.html(text);

            count++;

            // If all highlights have been deleted, resolve the Promise
            if (count === totalHighlighted) {
              resolve();
            }
        })


      });
    } else {
      // If there are no highlighted elements, resolve the Promise immediately
      resolve();
    }
  });
}
  
   /**
 * Highlights the selected text within the specified container element with the specified color and text color.
 * @param selString - The string of the selected text to highlight
 * @param container - The container element in which to highlight the selected text
 * @param selection - The selection object that represents the selected text
 * @returns True if the text was successfully highlighted, false otherwise
 */
function highlightSelected(
  selString: string,
  container: HTMLElement,
  selection: Selection,
): boolean {

  // int calue
  const color = "yellow";
  const textColor = "inherit";
  const highlightIndex = 0;
  // Create an object that contains information about the highlight
  const highlightInfo: HighlightInfo = {
    color,
    textColor,
    highlightIndex,
    selectionString: selString,
    anchor: $(selection.anchorNode as HTMLElement),
    anchorOffset: selection.anchorOffset,
    focus: $(selection.focusNode as HTMLElement),
    focusOffset: selection.focusOffset,
  };

  // Remove any existing highlights before adding a new one
  deleteHighlights().then(() => {
    try {
      // Highlight the selected text recursively within the container element
      recursiveWrapper($(container), highlightInfo);
    } catch (e) {
      // If an error occurs during highlighting, return false
      return false;
    }

    // Remove the selection range after highlighting is complete
    if (selection.removeAllRanges) selection.removeAllRanges();
  });

  // Return true to indicate that highlighting was successful
  return true;
}

  

/**
 * Recursively highlights the selected text within the specified container element with the specified color and text color.
 * @param container - The container element in which to highlight the selected text
 * @param highlightInfo - An object that contains information about the highlight
 * @returns A tuple containing a boolean indicating whether the start of the highlight has been found and the number of characters highlighted so far
 */
 function recursiveWrapper(
  container: JQuery<Node>,
  highlightInfo: HighlightInfo
): [boolean, number] {
  // Call the internal '_recursiveWrapper' function to perform the actual highlighting
  return _recursiveWrapper(container, highlightInfo, false, 0);
}
  
/**
 * Recursive function to highlight text within a container element.
 *
 * @param {JQuery<Node>} container - The container element to search for text to highlight.
 * @param {HighlightInfo} highlightInfo - An object containing information about the text to highlight.
 * @param {boolean} startFound - A flag indicating whether the starting position for the highlight has been found.
 * @param {number} charsHighlighted - The number of characters that have been highlighted so far.
 *
 * @returns {[boolean, number]} An array containing the updated startFound and charsHighlighted values.
 */
 function _recursiveWrapper(container: JQuery<Node>, highlightInfo: HighlightInfo, startFound: boolean, charsHighlighted: number): [boolean, number] {
  const { anchor, focus, anchorOffset, focusOffset, color, textColor, highlightIndex, selectionString } = highlightInfo;
  const selectionLength = selectionString.length;

  container.contents().each((_index, element) => {

    // If all characters have been highlighted, stop searching.
    if (charsHighlighted >= selectionLength) return;

    if (element.nodeType !== Node.TEXT_NODE) {
      // If the element is not a text node, recursively search its contents.
      const jqElement = $(element);
      if (jqElement.is(':visible') && getComputedStyle(element as Element).visibility !== 'hidden') {
        [startFound, charsHighlighted] = _recursiveWrapper(jqElement, highlightInfo, startFound, charsHighlighted);
      }
      return;
    }

    let startIndex = 0;
    if (!startFound) {
      // If the starting position has not been found yet, check if this element contains the anchor or focus node.
      if (!anchor.is(element as Element) && !focus.is(element as Element)) return;

      // Update startFound and startIndex based on the position of the anchor and focus nodes.
      startFound = true;
      startIndex = Math.min(...[
        ...(anchor.is(element as Element) ? [anchorOffset] : []),
        ...(focus.is(element as Element) ? [focusOffset] : []),
      ]);
    }

    const { nodeValue, parentElement: parent } = element as Text;

    if (nodeValue && startIndex > nodeValue.length) {
      // If the starting position is outside the range of the current text node, throw an error.
      throw new Error(`No match found for highlight string '${selectionString}'`);
    }

    const textNode = element as Text;
    const highlightTextEl = textNode.splitText(startIndex);

    let i = startIndex;
    if (nodeValue !== null) {
      // Loop through each character in the text node.
      for (; i < nodeValue.length; i++) {

        // Skip over whitespace characters.
        while (charsHighlighted < selectionLength && selectionString[charsHighlighted].match(/\s/u)) charsHighlighted++;

        // If all characters have been highlighted, stop looping.
        if (charsHighlighted >= selectionLength) break;

        const char = nodeValue[i];
        if (char === selectionString[charsHighlighted]) {
          // If the current character matches the next character in the highlight string, increment the charHighlighted counter.
          charsHighlighted++;
        } else if (!char.match(/\s/u)) {
          // If the current character does not match the next character in the highlight string and is not whitespace, throw an error.
          throw new Error(`No match found for highlight string '${selectionString}'`);
        }
      }
    }

    if (parent && parent.classList.contains(HIGHLIGHT_CLASS)) return;

    const elementCharCount = i - startIndex;
    const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
    const highlightText = highlightTextEl.nodeValue;

   
        if (parent && highlightText && highlightText.match(/^\s*$/u)) {
            parent.normalize(); 
            return;
        }


        const highlightNode = document.createElement('span');
        highlightNode.classList.add( HIGHLIGHT_CLASS);
        highlightNode.style.backgroundColor = color;
        highlightNode.style.color = textColor;
        highlightNode.dataset.highlightId = highlightIndex.toString();
        highlightNode.textContent = highlightTextEl.nodeValue;
        highlightTextEl.remove();
        if(parent) parent.insertBefore(highlightNode, insertBeforeElement);
    });

    return [startFound, charsHighlighted];
}

export  {highlightSelected,deleteHighlights};
