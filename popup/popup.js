document.getElementById("summarize-btn").addEventListener("click", () => {
    // Query the currently active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Send a message to the content script of the active tab
      chrome.tabs.sendMessage(
        tabs[0].id, 
        { action: "extractContent" }, 
        (response) => {
          // Check if there's an error in the response
          if (chrome.runtime.lastError) {
            console.error("Error communicating with content script:", chrome.runtime.lastError.message);
            alert("Error: Could not communicate with the content script.");
          } else if (response?.error) {
            alert("Error: " + response.error);
          } else if (response?.content) {
            // Update the summary box with the extracted content
            document.getElementById("summary-box").textContent = response.content;
          } else {
            alert("No content found.");
          }
        }
      );
    });
  });
  