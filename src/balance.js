/**
 * Gets the current point balance of the user.
 * @param {Object} transactions List of past transactions
 * @return {Object} List of each payer and its associated point balance
 */
function balance(transactions) {
    // Tally points from each payer found in transactions
    balance = {};

    transactions.forEach((transaction) => {
        if (Object.keys(balance).includes(transaction.payer)) {
            balance[transaction.payer] += transaction.points;
        } else {
            balance[transaction.payer] = transaction.points;
        }
    });

    return balance;
}

module.exports = { balance };
