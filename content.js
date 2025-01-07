// content.js
if (typeof window.readabilityLoaded === 'undefined') {
    window.readabilityLoaded = false;
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "extractContent") {
        try {
          const article = new Readability(document.cloneNode(true)).parse();
          if (article) {
            console.log("Extracted Text:", article.textContent);
            sendResponse({
              title: article.title,
              content: article.textContent
            });
          } else {
            sendResponse({ error: "Unable to extract content" });
          }
        } catch (error) {
          console.error("Extraction error:", error);
          sendResponse({ error: error.message });
        }
      }
      return true;
    });
  }