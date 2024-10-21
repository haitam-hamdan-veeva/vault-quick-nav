const suggestions = [
  'Apple',
  'Banana',
  'Orange',
  'Grape',
  'Pineapple',
  'Strawberry',
  'Watermelon',
  'Mango',
];

function loadFontAwesome() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(link);
}

function createSearchBox() {
  loadFontAwesome();
  const searchBox = document.createElement('div');
  searchBox.id = 'vqn-search-box';
  searchBox.className = 'vqn-search-box';
  searchBox.innerHTML = `
  <div id="vqn-search-bar" class="vqn-search-bar">
    <input type="text" id="vqn-search-input" class="vqn-search-input" placeholder="What are you looking for?" autocomplete="off" />
    <button id="vqn-search-btn" class="vqn-search-btn">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>
  <div id="vqn-autocomplete-box" class="vqn-autocomplete-box">
    <ul id="vqn-autocomplete-list" class="vqn-autocomplete-list"></ul>
  </div>
  `;

  document.body.appendChild(searchBox);

  const searchInput = document.getElementById('vqn-search-input');

  searchInput.addEventListener('input', () => {
    const inputValue = searchInput.value.toLowerCase();
    const filterSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue)
    );
    createAutocompleteList(filterSuggestions);
  });
}

function toggleSearchBox() {
  const searchBox = document.getElementById('vqn-search-box');

  if (!searchBox) {
    createSearchBox();
  } else {
    searchBox.style.display =
      searchBox.style.display === 'none' ? 'block' : 'none';

    const searchInput = document.getElementById('vqn-search-input');
    searchInput.value = '';
  }
}

function createAutocompleteList(suggestions) {
  const autocompleteList = document.getElementById('vqn-autocomplete-list');

  autocompleteList.innerHTML = '';

  suggestions.forEach((suggestion) => {
    const listItem = document.createElement('li');
    listItem.textContent = suggestion;
    listItem.addEventListener('click', () => {
      document.getElementById('vqn-search-input').value = suggestion;
      autocompleteList.innerHTML = '';
    });
    autocompleteList.appendChild(listItem);
  });

  const searchInput = document.getElementById('vqn-search-input');
  if (!searchInput.value) {
    autocompleteList.innerHTML = '';
  }
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleSearchBox') {
    toggleSearchBox();
  }
});
