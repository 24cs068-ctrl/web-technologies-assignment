/* ===========================================================
   Task 5 — Supermarket Billing System
   Demonstrates: variables & data types, literals, operators,
   statements (selection), and a user-defined function.
   =========================================================== */

// Literals: the discount rate and the threshold that triggers it
const DISCOUNT_RATE = 0.10;      // numeric literal — 10%
const DISCOUNT_THRESHOLD = 2000; // numeric literal — ₹2000

/**
 * calculateBill(products)
 * A user-defined function: accepts an array of {quantity, price}
 * objects, sums them into a subtotal, applies the discount rule
 * with a selection (if) statement, and returns the breakdown.
 */
function calculateBill(products) {
  let subtotal = 0; // variable, Number data type

  // Iteration statement: total up every product line
  for (let i = 0; i < products.length; i++) {
    const lineTotal = products[i].quantity * products[i].price; // arithmetic operator: *
    subtotal = subtotal + lineTotal;                            // arithmetic operator: +
  }

  let discount = 0;
  let discountApplied = false;

  // Selection statement: only discount orders over the threshold
  if (subtotal > DISCOUNT_THRESHOLD) {
    discount = subtotal * DISCOUNT_RATE;
    discountApplied = true;
  }

  const payable = subtotal - discount; // arithmetic operator: subtraction

  return { subtotal, discount, payable, discountApplied };
}

// ---------- Wiring the function up to the form ----------

const form = document.getElementById("billForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const products = [];

  // Iteration statement: read quantity + price for all 3 products
  for (let i = 1; i <= 3; i++) {
    const quantity = Number(document.getElementById("qty" + i).value);
    const price = Number(document.getElementById("price" + i).value);
    products.push({ quantity: quantity, price: price });
  }

  const bill = calculateBill(products);

  document.getElementById("bSubtotal").textContent = "₹" + bill.subtotal.toFixed(2);
  document.getElementById("bDiscount").textContent = "− ₹" + bill.discount.toFixed(2);
  document.getElementById("bTotal").textContent = "₹" + bill.payable.toFixed(2);

  // Selection statement: only show the discount row/note when it applies
  const discountRow = document.getElementById("discountRow");
  const discountNote = document.getElementById("discountNote");
  if (bill.discountApplied) {
    discountRow.classList.remove("hidden");
    discountNote.classList.remove("hidden");
  } else {
    discountRow.classList.add("hidden");
    discountNote.classList.add("hidden");
  }

  document.getElementById("bill").classList.remove("hidden");
});
