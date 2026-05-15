const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalElement.textContent = total.toFixed(2);
}

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.className = "expense-item";

    li.innerHTML = `
      <div class="expense-details">
        <strong>${expense.name} - £${expense.amount.toFixed(2)}</strong>
        <span class="category">${expense.category}</span>
      </div>
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;

    expenseList.appendChild(li);
  });

  calculateTotal();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderExpenses();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("expense-name").value.trim();
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const category = document.getElementById("expense-category").value;

  if (!name || amount <= 0 || !category) {
    alert("Please enter valid expense details.");
    return;
  }

  expenses.push({ name, amount, category });
  saveExpenses();
  renderExpenses();

  form.reset();
});

renderExpenses();
