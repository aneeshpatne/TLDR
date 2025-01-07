document.getElementById("summarize-btn").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Inject content script if not already injected
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['libs/readability.min.js', 'content.js']
      });
  
      const response = await chrome.tabs.sendMessage(tab.id, { action: "extractContent" });
      
      if (response?.content) {
        document.getElementById("summary-box").textContent = response.content;
      } else {
        document.getElementById("summary-box").textContent = "No content found.";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("summary-box").textContent = "Error extracting content.";
    }
  });