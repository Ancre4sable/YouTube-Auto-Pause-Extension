document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle');

  chrome.storage.sync.get('autoPause', (data) => {
    toggleButton.checked = data.autoPause;
  });

  toggleButton.addEventListener('change', () => {
    const newAutoPause = toggleButton.checked;
    chrome.storage.sync.set({ autoPause: newAutoPause });
  });
});
