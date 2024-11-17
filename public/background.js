function getCurrentTabUrl(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        if (currentTab && currentTab.url) {
            callback(currentTab.url);
        }
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "get-url") {
        getCurrentTabUrl((url) => sendResponse({ url }));
        return true; // Keep the message channel open for async response
    }
});
