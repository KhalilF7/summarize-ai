
import { executeInCurrentTab } from '../utils';

function cursorState() {

function contentScriptCursorStater() {
        window.AISummarizeAPI.updateState();
}
executeInCurrentTab({ func: contentScriptCursorStater });
}


export default cursorState;