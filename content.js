if (!window.readabilityLoaded) {
    window.readabilityLoaded = true;
  
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "extractContent") {
        const article = new Readability(document.cloneNode(true)).parse();
        if (article) {
          
          sendResponse({
            title: article.title,
            content: article.textContent
          });
        } else {
          sendResponse({ error: "Unable to extract content" });
        }
      }
      return true; // Keep the message channel open for asynchronous response
    });
  }
  