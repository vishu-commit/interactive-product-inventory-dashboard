// Interactive Product Inventory & Analytics Dashboard
// Run: node index.js

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// prompt() function for taking terminal input in Node.js
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

// Initial inventory
const inventory = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Mouse", price: 25 }
];

const CATEGORY_THRESHOLDS = {
  budget: 50,
  standard: 200
};

// 1. Conditional evaluation
function getCategory(price) {
  if (!Number.isFinite(price) || price < 0) {
    return "Invalid";
  } else if (price < CATEGORY_THRESHOLDS.budget) {
    return "Budget";
  } else if (price <= CATEGORY_THRESHOLDS.standard) {
    return "Standard";
  } else {
    return "Premium";
  }
}

// 2. Format currency
function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

// 3. Regular function for total calculation
function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total;
}

// 4. Arrow function for average calculation
const calculateAverage = (items) =>
  items.length ? calculateTotal(items) / items.length : 0;

// 5. View inventory using forEach()
function printInventory(items = inventory) {
  console.log("\n--- Inventory ---");

  if (items.length === 0) {
    console.log("No products found.");
    return;
  }

  items.forEach((item) => {
    console.log(
      `#${item.id} ${item.name} — ${formatMoney(item.price)} — Category: ${getCategory(item.price)}`
    );
  });
}

// 6. Add product with input validation
function addProduct(name, price) {
  const cleanName = name.trim();

  if (!cleanName) {
    console.log("Product name cannot be empty.");
    return false;
  }

  if (!Number.isFinite(price) || price < 0) {
    console.log("Please enter a valid, non-negative price.");
    return false;
  }

  const duplicate = inventory.some(
    (item) => item.name.toLowerCase() === cleanName.toLowerCase()
  );

  if (duplicate) {
    console.log("This product already exists.");
    return false;
  }

  const nextId = inventory.length
    ? Math.max(...inventory.map((item) => item.id)) + 1
    : 1;

  inventory.push({
    id: nextId,
    name: cleanName,
    price: price
  });

  console.log(`${cleanName} added successfully.`);
  return true;
}

// 7. Search using loop, continue and break
function searchProduct(searchTerm) {
  const term = searchTerm.toLowerCase();
  let found = false;

  for (const item of inventory) {
    if (!item.name.toLowerCase().includes(term)) {
      continue;
    }

    console.log(
      `Found: ${item.name} — ${formatMoney(item.price)}`
    );

    found = true;
    break;
  }

  if (!found) {
    console.log("No matching product found.");
  }
}

// 8. Analytics using filter(), map() and forEach()
function showAnalytics() {
  console.log("\n--- Financial Analytics ---");

  console.log(`Product count: ${inventory.length}`);
  console.log(
    `Total inventory value: ${formatMoney(calculateTotal(inventory))}`
  );
  console.log(
    `Average product price: ${formatMoney(calculateAverage(inventory))}`
  );

  const affordable = inventory.filter(
    (item) => item.price < 200
  );

  console.log(
    `Affordable items (under $200): ${
      affordable.length
        ? affordable.map((item) => item.name).join(", ")
        : "None"
    }`
  );

  const report = inventory.map(
    (item) => `${item.name.toUpperCase()}: ${formatMoney(item.price)}`
  );

  console.log("Formatted Report:");

  report.forEach((line) => console.log(line));
}

// 9. Tax and discount calculation
function showTaxAndDiscount() {
  console.log("\n--- Tax & Discount Calculator ---");

  const subtotal = calculateTotal(inventory);
  const taxRate = 0.08;
  const discountRate = subtotal >= 500 ? 0.10 : 0;

  const discount = subtotal * discountRate;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * taxRate;
  const finalTotal = taxableAmount + tax;

  console.log(`Subtotal: ${formatMoney(subtotal)}`);
  console.log(`Discount (${discountRate * 100}%): -${formatMoney(discount)}`);
  console.log(`Tax (8%): ${formatMoney(tax)}`);
  console.log(`Final total: ${formatMoney(finalTotal)}`);
}

// 10. Take product input using prompt()
async function addProductFlow() {
  const name = await prompt("Enter product name: ");
  const rawPrice = await prompt("Enter product price: ");

  if (rawPrice === "") {
    console.log("Price cannot be empty.");
    return;
  }

  const price = Number(rawPrice);

  if (!Number.isFinite(price)) {
    console.log("Please enter a valid number.");
    return;
  }

  addProduct(name, price);
}

// 11. Search input
async function searchFlow() {
  const term = await prompt("Enter product name to search: ");

  if (!term) {
    console.log("Search term cannot be empty.");
    return;
  }

  searchProduct(term);
}

// 12. Menu using switch
async function mainMenu() {
  while (true) {
    console.log("\n========================================");
    console.log("  PRODUCT INVENTORY & ANALYTICS DASHBOARD");
    console.log("========================================");
    console.log("1. View inventory");
    console.log("2. Add a product");
    console.log("3. Search for a product");
    console.log("4. View analytics and reports");
    console.log("5. Calculate tax and discount");
    console.log("6. Exit");

    const choice = await prompt("\nChoose an option (1-6): ");

    switch (choice) {
      case "1":
        printInventory();
        break;

      case "2":
        await addProductFlow();
        break;

      case "3":
        await searchFlow();
        break;

      case "4":
        showAnalytics();
        break;

      case "5":
        showTaxAndDiscount();
        break;

      case "6":
        console.log("Thanks for using the Inventory Dashboard!");
        rl.close();
        return;

      default:
        console.log("Invalid choice. Select a number from 1 to 6.");
    }
  }
}

// 13. Initialize the application
async function startApplication() {
  console.log("--- Initializing Inventory System ---");

  console.log("\nAdd a new product to the existing inventory.");
  await addProductFlow();

  printInventory();
  showAnalytics();

  await mainMenu();
}

startApplication().catch((error) => {
  console.error("Something went wrong:", error.message);
  rl.close();
});