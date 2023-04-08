/*global chrome*/
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log(chrome);
  }, []);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
