// Existing quotes array
let quotes = [
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    // Add more quotes here...
];

// Load the last selected category from local storage or default to 'all'
let selectedCategory = localStorage.getItem('selectedCategory') || 'all';

// Display a random quote on button click
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Populate categories dropdown and set up filtering
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    filterQuotes(); // Apply any existing filter on page load
});

// Function to populate category dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Set the dropdown to the last selected category
    categoryFilter.value = selectedCategory;
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    selectedCategory = categoryFilter.value; // Update selected category

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Save the selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);

    // Display a random filtered quote
    if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        document.getElementById('quoteDisplay').textContent = randomQuote.text;
    } else {
        document.getElementById('quoteDisplay').textContent = 'No quotes available in this category.';
    }
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Save quotes to localStorage
        saveQuotes();

        // Update the category dropdown
        populateCategories();

        alert('New quote added successfully!');

        // Clear input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Save quotes array to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to load quotes from localStorage on page load
function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes = storedQuotes;
    }
}

// Load quotes from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadQuotes);

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
