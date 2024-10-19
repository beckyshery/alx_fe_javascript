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
    const formContainer = document.createElement('div'); // Container to hold the form

    // Function to display a random quote
    function showRandomQuote() {
        // Pick a random quote from the array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the DOM with the selected quote and category
        quoteDisplay.innerHTML = `<blockquote>${randomQuote.text}</blockquote><p>Category: <strong>${randomQuote.category}</strong></p>`;
    }

    // Function to create the add quote form dynamically
    function createAddQuoteForm() {
        // Clear the form container if there's already a form
        formContainer.innerHTML = '';

        // Create input fields and the add button dynamically
        const newQuoteTextInput = document.createElement('input');
        newQuoteTextInput.id = 'newQuoteText';
        newQuoteTextInput.type = 'text';
        newQuoteTextInput.placeholder = 'Enter a new quote';
        
        const newQuoteCategoryInput = document.createElement('input');
        newQuoteCategoryInput.id = 'newQuoteCategory';
        newQuoteCategoryInput.type = 'text';
        newQuoteCategoryInput.placeholder = 'Enter quote category';

        const addQuoteBtn = document.createElement('button');
        addQuoteBtn.textContent = 'Add Quote';
        addQuoteBtn.id = 'addQuoteBtn';

        // Add event listener for the "Add Quote" button
        addQuoteBtn.addEventListener('click', () => addQuote(newQuoteTextInput, newQuoteCategoryInput));

        // Append elements to the form container
        formContainer.appendChild(newQuoteTextInput);
        formContainer.appendChild(newQuoteCategoryInput);
        formContainer.appendChild(addQuoteBtn);

        // Append form container to the body (or any other part of the DOM you want)
        document.body.appendChild(formContainer);
    }

    // Function to add a new quote dynamically
    function addQuote(newQuoteTextInput, newQuoteCategoryInput) {
        const newQuoteText = newQuoteTextInput.value.trim();
        const newQuoteCategory = newQuoteCategoryInput.value.trim();

        // Validate inputs to ensure both fields are filled
        if (newQuoteText === '' || newQuoteCategory === '') {
            alert('Please enter both a quote and a category.');
            return;
        }

        // Add new quote
