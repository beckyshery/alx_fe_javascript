let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Simulate fetching quotes from the server every minute
setInterval(fetchQuotesFromServer, 60000);

// Load quotes on page load
document.addEventListener('DOMContentLoaded', () => {
    displayQuotes(quotes);
});

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        syncQuotes(serverQuotes);
    } catch (error) {
        console.error('Error fetching data from the server:', error);
    }
}

// Function to sync local quotes with server quotes
function syncQuotes(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    let updatedQuotes = [...localQuotes];

    serverQuotes.forEach((serverQuote) => {
        let localQuote = localQuotes.find(quote => quote.id === serverQuote.id);

        if (localQuote) {
            // Resolve conflicts: use the server's quote if it is more recent
            if (new Date(serverQuote.updatedAt) > new Date(localQuote.updatedAt)) {
                updatedQuotes = updatedQuotes.map(quote => 
                    quote.id === serverQuote.id ? serverQuote : quote);
            }
        } else {
            // Add new quotes from the server that don't exist locally
            updatedQuotes.push(serverQuote);
        }
    });

    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    displayQuotes(updatedQuotes);
    alert('Quotes synced with server!');  // Added alert for sync notification
}

// Function to add a new quote locally and sync it to the server
async function addQuote(newQuote) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    localQuotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(localQuotes));

    // Sync the new quote to the server
    await postQuoteToServer(newQuote);
}

// Function to post a new quote to the server
async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newQuote),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        console.log('Successfully posted new quote to the server:', data);
    } catch (error) {
        console.error('Error posting data to server:', error);
    }
}

// Function to notify user of conflict resolution
function notifyConflictResolution() {
    let notification = document.createElement('div');
    notification.textContent = "Data conflict resolved. Your quotes have been synced with the server.";
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Function to display quotes in the DOM
function displayQuotes(quotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = quotes.map(quote => `<p>${quote.text}</p>`).join('');
}
