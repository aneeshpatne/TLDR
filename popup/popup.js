let summarybox = document.getElementById('summary-box');
let summaryText = document.getElementById('summary-text');
let resetBtn = document.getElementById('reset-btn');
let summaryBtn = document.getElementById('summarize-btn');
let loading = document.getElementById('loading');
document.getElementById('reset-btn').addEventListener('click', () => {
  summarybox.style.visibility = 'hidden';
  summaryText.innerText = '';
  resetBtn.style.display = 'none';
  summaryBtn.style.display = 'block';
  chrome.storage.local.clear();
  requestAnimationFrame(() => {
    summarybox.style.height = summaryText.scrollHeight + 'px';
  });
  setTimeout(() => {
    summarybox.style.display = 'none';
    summarybox.style.visibility = 'visible';
  }, 700);

});
document.addEventListener('DOMContentLoaded', async () =>{
  const [tab] = await chrome.tabs.query({active: true, currentWindow:true});
  const url = tab.url;
  const encodedUrl = encodeURIComponent(url);
  chrome.storage.local.get([encodedUrl], (result) =>{
    if(result[encodedUrl]){
      summaryText.innerText = result[encodedUrl];
      summarybox.style.display = 'flex';
      summarybox.style.display = 'flex';
      setTimeout(() => {
        summarybox.style.height = summaryText.scrollHeight + 'px'}, 700);
      summaryBtn.style.display = 'none';
      resetBtn.style.display = 'block';
    }
  })
})
document.getElementById('summarize-btn').addEventListener('click', async () =>{

  try {
    summarybox.style.display = 'flex';
    summarybox.offsetHeight;
    summarybox.style.height = '20px';
    loading.style.display = 'flex';
    document.getElementById('summarize-btn').style.display = 'none';
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
      body: JSON.stringify({text: HTMLcontent.result})
    })
    
    const data = await response.json();
    loading.style.display = 'none';
    summaryText.innerText = data.message;
    const encodedUrl = encodeURIComponent(url);
    chrome.storage.local.set({[encodedUrl]: data.message}, () =>{
      console.log('Data saved');
    });

    requestAnimationFrame(() => {
      summarybox.style.height = summaryText.scrollHeight + 'px';
    });
    resetBtn.style.display = 'block';
    
  } catch(error) {
    console.error(error);
    loading.style.display = 'none';
    resetBtn.style.display = 'block';
    summaryText.innerText = 'An error occurred while summarizing the text';
    requestAnimationFrame(() => {
      summarybox.style.height = summaryText.scrollHeight + 'px';
    });
  }
})