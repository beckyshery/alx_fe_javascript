let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Simulate fetching quotes from the server every minute
setInterval(fetchQuotesFromServer, 60000);

function fetchQuotesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(function(response) {
            return response.json();
        })
        .then(function(serverQuotes) {
            syncWithLocalQuotes(serverQuotes);
        })
        .catch(function(error) {
            console.error('Error fetching data from server:', error);
        });
}

function syncWithLocalQuotes(serverQuotes) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    let updatedQuotes = [];

    serverQuotes.forEach(function(serverQuote) {
        let localQuote = localQuotes.find(function(quote) {
            return quote.id === serverQuote.id;
        });

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

function addQuote(newQuote) {
    let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
    localQuotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(localQuotes));

    // Sync the new quote to the server
    postQuoteToServer(newQuote);
}

function postQuoteToServer(newQuote) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newQuote),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log('Successfully posted new quote to the server:', data);
    })
    .catch(function(error) {
        console.error('Error posting data to server:', error);
    });
}

function notifyConflictResolution() {
    let notification = document.createElement('div');
    notification.textContent = "Data conflict resolved. Your quotes have been synced with the server.";
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(function() {
        notification.remove();
    }, 5000);
}

function displayQuotes(quotes) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = quotes.map(function(quote) {
        return `<p>${quote.text}</p>`;
    }).join('');
}
