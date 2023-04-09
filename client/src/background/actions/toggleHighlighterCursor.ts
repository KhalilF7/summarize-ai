
import { executeInCurrentTab } from '../utils';

function toggleHighlighterCursor() {

function contentScriptToggleHighlighterCursor() {
        window.AISummarizeAPI.toggle();
}
executeInCurrentTab({ func: contentScriptToggleHighlighterCursor });
}


export default toggleHighlighterCursor;