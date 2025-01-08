document.getElementById("summarize-btn").addEventListener("click", async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      data = await chrome.scripting.executeScript({
        target: { tabId: tab.id},
        func: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              const body = document.body.innerText;
              resolve(body || "No content found");
            }, 1000);
          })
        }
      });
    document.getElementById("summary-box").style.display = "flex";
    document.getElementById("summary-text").innerText = data[0].result;
    } catch (error) {
      console.error(error);
    }

  });