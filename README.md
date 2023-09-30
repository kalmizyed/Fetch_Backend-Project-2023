# Fetch Backend Project - Fall 2023
A small REST API that allows the user to add, spend, and check the balance of a
bank of points.


## Quick Start

1. Clone this repo:

```git clone https://github.com/kalmizyed/Fetch_Backend-Project-2023.git```

2. Install the required dependencies with `npm`:

(If you don't have `npm` installed, you can [follow this guide.]([url](https://docs.npmjs.com/cli/v7/configuring-npm/install)https://docs.npmjs.com/cli/v7/configuring-npm/install))

```
cd Fetch_Backend-Project-2023/
npm install
```

3. Start the server:

```
npm start
```

The server should now be running on port 8000:

```
> backend-challenge@1.0.0 start
> node src/backend.js

Server listening on port 8000
```

## How to use

Every time the server starts, it starts with an empty point bank.  You can add,
spend, or view your point balance with the following HTTP requests:

### Add

The `/add` endpoint takes a JSON object with `payer`, `points`, and `timestamp`
attributes as input, then adds that transaction's data to the server's
transaction history.

Example:

```
POST http://localhost:8000/add HTTP/1.1
Content-Type: application/json

{
"payer" : "DANNON",
"points" : 5000,
"timestamp" : "2020-11-02T14:00:00Z"
}
```

### Spend

The `/spend` endpoint takes a JSON object with a `points` attribute as input,
then spends that many points from the server's stored transactions, starting
with the transaction with the oldest timestamp.  The endpoint then responds with
a receipt of each payer and the amount of points spent from their transactions.

Example input:

```
POST http://localhost:8000/spend HTTP/1.1
Content-Type: application/json

{"points" : 5000}
```

Example response:

```
[
{ "payer": "DANNON", "points": -100 },
{ "payer": "UNILEVER", "points": -200 },
{ "payer": "MILLER COORS", "points": -4,700 }
]
```

### Balance

The `/balance` endpoint takes no input and responds with a list of each payer in
the transaction history and the amount of points from each payer still in the
user's balance.

Example request:

```
GET http://localhost:8000/balance
```

Example response:

```
{
"DANNON": 1000,
”UNILEVER” : 0,
"MILLER COORS": 5300
}
```
