if (document.body){
    const article = new Readibility(document.cloneNode(true)).parse();
if (article){
    console.log("Title:", article.title);
    console.log("Content:", article.textContent);
    console.log("HTML:", article.content);
}else{
    console.log("No article found on this page.");
}
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractContent") {
      const article = new Readability(document.cloneNode(true)).parse();
      if (article) {
        sendResponse({
          title: article.title,
          content: article.textContent
        });
      } else {
        sendResponse({ error: "Unable to extract content." });
      }
    }
  });
  