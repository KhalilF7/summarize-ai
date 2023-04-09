import * as api from './api';
import {initializeHighlighterCursor} from './actions/cursor'

  
window.onload = ()=>{
  
  window.AISummarizeAPI = api;
  initializeHighlighterCursor();
}

export { };