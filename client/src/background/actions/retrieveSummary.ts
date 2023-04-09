function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function retrieveSummary (selectionString: string,sendResponse:any, token: string){

			  console.log(token);
              
              // Call API and wait for the result
              const result = await fetch('http://localhost:8000/summarize-ai/message', {
            	method: 'POST',
            	body: JSON.stringify({ text: selectionString }),
            	headers: {
            	  'Content-Type': 'application/json',
            	  'Authorization': `Bearer ${token}`
            	}
              });
			  const data = await result.text();
			  console.log(data);
              sendResponse({ summary: data });;
}

export default retrieveSummary;