document.getElementById("summarize-btn").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      // Inject scripts dynamically
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['libs/readability.min.js', 'content.js'],
      });
  

      const response = await new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tab.id, { action: "extractContent" }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(response);
          }
        });
      });

      if (response?.content) {
        console.log("Content extracted:", response.content);
        document.getElementById("summary-box").style.display = "flex";
        document.getElementById("summary-text").textContent = response.content;
      } else {
        document.getElementById("summary-box").textContent = "No content found.";
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("summary-box").textContent = "Error extracting content.";
    }
  });
  