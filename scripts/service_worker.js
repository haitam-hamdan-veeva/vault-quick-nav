chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-search-box') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleSearchBox' });
      console.log('message sent to content.js!');
    });
  }
});
