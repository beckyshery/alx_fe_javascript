document.addEventListener('DOMContentLoaded', () => {
    // Quote array (loaded from localStorage if available)
    let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    
    // Selecting DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const formContainer = document.createElement('div');
    
    // Load the last viewed quote from sessionStorage (optional)
    const lastViewedQuote = sessionStorage.getItem('lastQuote');
    if (lastViewedQuote) {
        quoteDisplay.innerHTML = lastViewedQuote;
    }

    // Function to display a random quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.innerHTML = 'No quotes available. Please add some!';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        const quoteHTML = `<blockquote>${randomQuote.text}</blockquote><p>Category: <strong>${randomQuote.category}</strong></p>`;
        quoteDisplay.innerHTML = quoteHTML;

        // Save last viewed quote in sessionStorage
        sessionStorage.setItem('lastQuote', quoteHTML);
    }

    // Function to create the add quote form dynamically
    function createAddQuoteForm() {
        formContainer.innerHTML = '';

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

        addQuoteBtn.addEventListener('click', () => addQuote(newQuoteTextInput, newQuoteCategoryInput));

        formContainer.appendChild(newQuoteTextInput);
        formContainer.appendChild(newQuoteCategoryInput);
        formContainer.appendChild(addQuoteBtn);

        document.body.appendChild(formContainer);
    }

    // Function to add a new quote dynamically
    function addQuote(newQuoteTextInput, newQuoteCategoryInput) {
        const newQuoteText = newQuoteTextInput.value.trim();
        const newQuoteCategory = newQuoteCategoryInput.value.trim();

        if (newQuoteText === '' || newQuoteCategory === '') {
            alert('Please enter both a quote and a category.');
            return;
        }

        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);

        // Save quotes to localStorage
        saveQuotes();

        newQuoteTextInput.value = '';
        newQuoteCategoryInput.value = '';

        alert('New quote added successfully!');
    }

    // Function to save quotes to localStorage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // JSON Export Functionality
    function exportToJsonFile() {
        const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // JSON Import Functionality
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Event listener for showing a random quote
    newQuoteButton.addEventListener('click', showRandomQuote);

    // Create the add quote form dynamically on page load
    createAddQuoteForm();

    // Adding buttons for export/import
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Export Quotes to JSON';
    exportButton.addEventListener('click', exportToJsonFile);
    document.body.appendChild(exportButton);

    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.addEventListener('change', importFromJsonFile);
    document.body.appendChild(importInput);
});
