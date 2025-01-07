if (typeof window.readabilityLoaded === 'undefined') {
    window.readabilityLoaded = false;
    window.extractedArticle = null;
  
    function initReadability() {
      if (!window.readabilityLoaded && typeof Readability !== 'undefined') {
        window.readabilityLoaded = true;
  
        // Parse the article once and store it globally
        window.extractedArticle = new Readability(document.cloneNode(true)).parse();
        if (window.extractedArticle) {
          console.log("Extracted Title:", window.extractedArticle.title);
          console.log("Extracted Text:", window.extractedArticle.textContent);
        } else {
          console.log("No article content found on this page.");
        }
      }
    }
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "extractContent") {
        try {
          initReadability(); // Ensure Readability is initialized
          if (window.extractedArticle) {
            sendResponse({
              title: window.extractedArticle.title,
              content: window.extractedArticle.textContent,
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
  
    initReadability();
  }
  