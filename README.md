# Interactive Product Inventory & Analytics Dashboard

A beginner-friendly JavaScript capstone mini project that manages a small product inventory and generates simple financial analytics in the terminal.

## Features

- View products and their price categories
- Add products with input validation
- Search for a product by name
- Calculate total and average inventory value
- Filter affordable products and create a formatted report
- Calculate an example discount and tax
- Demonstrates core JavaScript concepts

## Technologies

- JavaScript (Node.js)
- Node.js built-in `readline` module — no external packages required

## Requirements

Install [Node.js](https://nodejs.org/) (LTS version recommended).

Check your installation:

```bash
node --version
npm --version
```

## Run the project

1. Download or clone this repository.
2. Open a terminal inside the project folder.
3. Run:

```bash
npm start
```

Or run directly:

```bash
node index.js
```

## Menu

1. View inventory
2. Add a product
3. Search for a product
4. View analytics and reports
5. Calculate tax and discount
6. Exit

The starting inventory contains a Laptop priced at $800 and a Mouse priced at $25. Added products remain available while the program is running; the data resets when you restart it.

## JavaScript concepts demonstrated

| Concept | Where it is used |
|---|---|
| Variables, arrays, and objects | Inventory data |
| `prompt`-style user input | Node.js `readline` interface |
| `if...else` | Price categories and validation |
| `switch` | Main menu |
| Loops, `continue`, `break` | Product search and menu control |
| Regular functions | `getCategory`, `calculateTotal`, `printInventory` |
| Arrow functions | `ask`, `calculateAverage`, array callbacks |
| Scope | Function-local variables and constants |
| `forEach()` | Printing inventory and reports |
| `filter()` | Affordable products |
| `map()` | Formatted report |
| `reduce()` | Total inventory value |
| `async/await` | Waiting for terminal input |

## Notes

- Prices are sample values in US dollars, matching the assignment example.
- The tax rate (8%) and discount rule (10% discount when subtotal is at least $500) are examples for demonstration, not financial advice.
- This is a console application; it does not currently save data to a database or file.

## Future improvements

- Save inventory in a JSON file or database
- Add update and delete product options
- Build a browser-based dashboard with HTML, CSS, and JavaScript
- Add automated tests

## License

MIT
