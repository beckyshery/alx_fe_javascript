let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Simulate fetching quotes from the server every minute
setInterval(fetchQuotesFromServer, 60000);

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();
        syncWithLocalQuotes(serverQuotes);
    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}

function syncWithLocalQuotes(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    let updatedQuotes = [];

    serverQuotes.forEach((serverQuote) => {
        let localQuote = localQuotes.find(quote => quote.id === serverQuote.id);

        if (localQuote) {
            if (new Date(serverQuote.updatedAt) > new Date(localQuote.updatedAt)) {
                updatedQuotes.push(serverQuote);
            } else {
                updatedQuotes.push(localQuote);
            }
        } else {
            updatedQuotes.push(serverQuote);
        }
    });

    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    displayQuotes(updatedQuotes);
    notifyConflictResolution();
}

async function addQuote(newQuote) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    localQuotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(localQuotes));

    // Sync the new quote to the server
    await postQuoteToServer(newQuote);
}

async function postQuoteToServer(newQuote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newQuote),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        console.log('Successfully posted new quote to the server:', data);
    } catch (error) {
        console.error('Error posting data to server:', error);
    }
}

function notifyConflictResolution() {
    let notification = document.createElement('div');
    notification.textContent = "Data conflict resolved. Your quotes have been synced with the server.";
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function displayQuotes(quotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = quotes.map(quote => `<p>${quote.text}</p>`).join('');
}
