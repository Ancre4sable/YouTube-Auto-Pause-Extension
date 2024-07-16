chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ autoPause: true });
  console.log('Extension Installed: Auto Pause is set to true');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("autoPause", (data) => {
    const newAutoPause = !data.autoPause;
    chrome.storage.sync.set({ autoPause: newAutoPause });
    chrome.action.setBadgeText({ text: newAutoPause ? "ON" : "" });
    console.log('Auto Pause toggled to: ', newAutoPause);
  });
});