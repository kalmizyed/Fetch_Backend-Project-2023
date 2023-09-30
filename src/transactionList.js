const transactions = [];

transactions.total = 0;

const EMPTY_TRANSACTION = {
    points: 0,
};

// Returns the oldest transaction that has a balance above zero.
transactions.oldest = function() {
    return this.reduce((previous, current) => {
        // If current has no points, skip ahead
        if (current.points == 0) return previous;

        // If current is the first encountered with points, return current
        if (previous == -1) return current;

        // If both current and previous contain points, compare timestamps
        prevTime = new Date(previous.timestamp).getTime();
        currTime = new Date(current.timestamp).getTime();
        return prevTime < currTime ? previous : current;
    }, EMPTY_TRANSACTION);
};

module.exports = { transactions };
