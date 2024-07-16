console.log('Content script loaded');

function pauseVideo() {
  const video = document.querySelector('video');
  if (video) {
    video.pause();
    console.log('Video paused');
  } else {
    console.log('No video element found, retrying...');
    setTimeout(pauseVideo, 500);
  }
}

function setupObserver() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeName === 'VIDEO') {
          node.pause();
          console.log('Video paused by observer');
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log('Mutation observer set up');
}

function initialize() {
  chrome.storage.sync.get("autoPause", (data) => {
    console.log('Auto Pause is set to: ', data.autoPause);
    if (data.autoPause) {
      pauseVideo();
      setupObserver();
    }
  });
}

document.addEventListener('DOMContentLoaded', initialize);

window.addEventListener('yt-navigate-finish', initialize);

(function() {
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function() {
    originalPushState.apply(this, arguments);
    initialize();
  };

  history.replaceState = function() {
    originalReplaceState.apply(this, arguments);
    initialize();
  };

  window.addEventListener('popstate', function() {
    initialize();
  });
})();

setTimeout(initialize, 1000);
setTimeout(initialize, 3000);
setTimeout(initialize, 5000);
