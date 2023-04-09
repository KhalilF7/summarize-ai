async function tooltip(text: string) {
// Querying the active tab in the current window
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Getting the ID of the active tab
    const tabId = tabs[0].id;
        // Checking if the tab ID is not undefined
        if (tabId !== undefined) {
            // Sending a message to the content script in the active tab to update the tooltip text
            chrome.tabs.sendMessage(tabId, { action: "update-tooltip-text", text }, function (response) {
                if (chrome.runtime.lastError) console.error(chrome.runtime.lastError)
            });
        }
});
}


export default tooltip;