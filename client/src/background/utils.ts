/**
 * Gets the current active tab in the current window.
 * @returns Promise resolving to the current active tab.
 */
 async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

// Type definition for the function to be executed
type FuncType = (...args: any[]) => unknown;

/**
 * Executes a function in the current active tab.
 * @param opts Options for the execution.
 * @returns Promise resolving to the result of the executed function.
 */
async function executeInCurrentTab(opts: { file?: string; func: FuncType; args?: any[] }) {
    const tab = await getCurrentTab();
    if (!tab || typeof tab.id !== 'number') {
        throw new Error('Could not get current tab');
    }
    return executeInTab(tab.id, opts);
}

/**
 * Executes a function in a given tab.
 * @param tabId The ID of the tab to execute the function in.
 * @param opts Options for the execution.
 * @returns Promise resolving to the result of the executed function.
 */
async function executeInTab(tabId: number, { file, func, args }: { file?: string; func: FuncType; args?: any[] }) {
    const executions = await chrome.scripting.executeScript({
        target: { tabId, allFrames: true },
        ...(file && { files: [file] }),
        func, // Define the func property here
        args,
    });

    if (executions.length == 1) {
        return executions[0].result;
    }

    // If there are many frames, concatenate the results
    return executions.flatMap((execution) => execution.result);
}

export { executeInCurrentTab, executeInTab, getCurrentTab };
