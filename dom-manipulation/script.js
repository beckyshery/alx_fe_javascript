document.addEventListener('DOMContentLoaded', () => {
    // Quote array storing quotes as objects with text and category
    const quotes = [
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The purpose of our lives is to be happy.", category: "Happiness" },
        { text: "Get busy living or get busy dying.", category: "Motivation" },
    ];

    // Selecting DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteBtn = document.getElementById('addQuoteBtn');
    const newQuoteTextInput = document.getElementById('newQuoteText');
    const newQuoteCategoryInput = document.getElementById('newQuoteCategory');

    // Function to display a random quote
    function showRandomQuote() {
        // Pick a random quote from the array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the DOM with the selected quote and category
        quoteDisplay.innerHTML = `<blockquote>${randomQuote.text}</blockquote><p>Category: <strong>${randomQuote.category}</strong></p>`;
    }

    // Function to add a new quote dynamically
    function addQuote() {
        const newQuoteText = newQuoteTextInput.value.trim();
        const newQuoteCategory = newQuoteCategoryInput.value.trim();

        // Validate inputs to ensure both fields are filled
        if (newQuoteText === '' || newQuoteCategory === '') {
            alert('Please enter both a quote and a category.');
            return;
        }

        // Add new quote to the quotes array
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Clear the input fields
        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';

        // Confirm quote has been added
        alert('New quote added successfully!');
    }

    // Event listener for showing a random quote
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Event listener for adding a new quote
    addQuoteBtn.addEventListener('click', addQuote);
});
