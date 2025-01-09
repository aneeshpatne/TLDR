document.getElementById('summarize-btn').addEventListener('click', async () =>{
  let summarybox =document.getElementById('summary-box')
  let summaryText = document.getElementById('summary-text')
  try{
    summarybox.style.display = 'block';
    summaryText.innerText = 'Loading...';
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    const [HTMLcontent] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => {
        return document.body.innerText;
      }
    })
    const response = await fetch("http://127.0.0.1:5000/extract", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body :JSON.stringify({text: HTMLcontent.result})
    })
    const data = await response.json();
    document.getElementById('summarize-btn').style.display = 'none';
    summaryText.innerText = data.message;

  

  }
  catch(error){
    console.error(error);
    summaryText.innerText = 'An error occured while summarizing the text';
  }
})