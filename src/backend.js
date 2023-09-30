const express = require('express');
const app = express();

const { spend } = require('./spend');
const { balance } = require('./balance');

// User state //
const { transactions } = require('./transactionList');

// Endpoints //

app.use(express.json());

app.post('/add', (request, response) => {
    // Add transaction to user's transaction list
    transactions.push(request.body);

    // Increment total
    transactions.total += request.body.points;

    response.sendStatus(200);
});

app.post('/spend', (request, response) => {
    const toSpend = request.body.points;

    // Fail early if requested points exceed total
    if (toSpend > transactions.total) {
        response.status(400).send('User doesn\'t have enough points to spend!');
        return;
    }

    try {
        // Calculate spend transaction
        receipt = spend(toSpend, transactions);
    } catch (err) {
        // Handle empty transaction error
        response.status(400).send('Error: cannot spend zero points!');
        return;
    }

    response.json(receipt);
});

app.get('/balance', (request, response) => {
    response.json(balance(transactions));
});

// Server setup //

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
