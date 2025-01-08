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
    
    const response = await fetch("http://127.0.0.1:5000/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text: data[0].result}),
    })
    data = await response.json();
    document.getElementById("summary-box").style.display = "flex";
    document.getElementById("summary-text").innerText = data.message;
    } catch (error) {
      console.error(error);
    }

  });