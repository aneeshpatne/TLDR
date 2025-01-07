// Placeholder for adding interactive logic in the future
document.getElementById("summarize-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extractContent" }, (response) => {
        if (response.error) {
          alert("Error: " + response.error);
        } else {
          document.getElementById("summary-box").textContent = response.content;
        }
      });
    });
  });
  