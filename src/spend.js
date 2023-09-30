/**
 *  Spends <toSpend> amount of points, starting from the oldest transaction
 * @param {number} toSpend The amount to spend.
 * @param {Object} transactions List of past transactions
 * @return {Object} A receipt of every transaction subtracted from
 */
function spend(toSpend, transactions) {
    // Keep track of points to spend and points spent from each payer
    remaining = toSpend;
    receipt = [];

    // While there are points left to spend, spend from oldest saved transaction
    while (remaining > 0) {
        const current = transactions.oldest();

        // If current transaction is empty, an error has occurred
        if (!Object.hasOwn(current, 'points') || current.points == 0) {
            throw emptyTransactionError;
        }

        // Calculate amount spent
        let spent = 0;
        if (current.points >= remaining) {
            current.points -= remaining;
            spent -= remaining;
            remaining = 0;
        } else {
            remaining -= current.points;
            spent -= current.points;
            current.points = 0;
        }

        // Add amount spent to receipt
        receipt.push({
            payer: current.payer,
            points: spent,
        });
    }

    // Decrement total
    transactions.total -= toSpend;

    // Return receipt
    return receipt;
}

module.exports = { spend };
