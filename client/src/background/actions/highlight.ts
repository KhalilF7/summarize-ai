import { executeInCurrentTab } from '../utils';

async function highlightText() {

    function contentScriptHighlightText() {
        window.AISummarizeAPI.highlight();
    }

    executeInCurrentTab({ func: contentScriptHighlightText });
}

export default highlightText;
