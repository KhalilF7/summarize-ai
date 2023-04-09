# Chrome Extension README

## Description
This is a Chrome extension that allows users to highlight text on a webpage and generate a summary of the highlighted text.

## Setup
1. Clone the repository to your local machine.
2. Open the Chrome browser and navigate to chrome://extensions.
3. Enable Developer Mode in the top right corner.
4. Click on "Load unpacked" and select the build folder OR drag and drop summarize-ai.zip.
5. The extension should now be loaded and ready to use.


## Server
1. Run <code>npm install</code> to install the required dependencies.
2. Update environment file.
3. Run <code>npm start</code> to start server.

## Development Frontend
1. Run <code>npm install</code> to install the required dependencies.
2. Run <code>npm build</code> to build project.
3. Make changes to the code and save the files.
4. Reload the extension in the Extensions page to see the changes.

## Usage
1. Navigate to a webpage.
2. Click on the Chrome extension icon in the toolbar.
3. Click Enable.
4. Highlight text you want to summarize.
5. The summary will be displayed in a tooltip.

### **Requirements:**

- [x] **Chrome extension:** Create a Chrome extension with a popup that includes a button to enable/disable the feature and a list of summaries generated so far.
- [x] **React components:** Create reusable React components for the popup, highlights list, and the summary tooltip.
- [x] **State management:** Use React hooks and context API to manage the application state.
- [x] **TypeScript:** Strictly use TypeScript throughout the project and ensure proper typing for all components and functions.
- [x] **Highlight functionality:** When the feature is enabled, allow users to highlight text on a webpage by selecting it with their mouse.
- [x] **API integration:** Integrate the OpenAI API to process the highlighted text and generate a brief summary.
- [x] **Display the summary:** Show the summary in a tooltip when the user hovers over the highlighted text, using a custom React component.
- [x] **Backend:** Implement a NestJS backend that will handle the API calls to OpenAI and any necessary processing.
- [x] **Data persistence:** Store the user's highlights and summaries using MongoDB.
- [ ] **Testing:** Write unit tests for your code to ensure the proper functionality of the Chrome extension, with a focus on testing React components and TypeScript typings.

### **Stretch Goals (Optional):**

- [x] **User authentication:** Implement a user authentication system using React components and context API, allowing users to access their saved highlights and summaries across devices.
- [ ] **Tagging system:** Allow users to categorize their highlights with tags for easier organization and retrieval. Use React components to display and manage tags.
- [x] **Export functionality:** Enable users to export their highlights and summaries as a PDF, CSV, or other formats using a dedicated React component.
