let expenses = [];

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountCell = document.getElementById("total-amount");
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', function () {
    const name = expenseName.value;
    const amount = Number(expenseAmount.value);

    if (name === '') {
        alert("Please enter a valid name");
        return;
    }
    if (isNaN(amount) || amount < 0) {
        alert("Please enter a valid number");
        return;
    }

    // Pushing new expense object into expenses array
    expenses.push({ name: name, amount: amount });

    // Updating total amount
    let totalAmount = 0;
    for (const expense of expenses) {
        totalAmount += expense.amount;
    }
    totalAmountCell.textContent = totalAmount;

    // Creating new row for the expense
    const newRow = expenseList.insertRow();

    const nameCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    nameCell.textContent = name;
    amountCell.textContent = amount;

    // Creating delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        // Removing the expense from the expenses array
        expenses.splice(expenses.findIndex(exp => exp.name === name && exp.amount === amount), 1);

        // Updating total amount
        let totalAmount = 0;
        for (const expense of expenses) {
            totalAmount += expense.amount;
        }
        totalAmountCell.textContent = totalAmount;

        // Removing the row from the table
        expenseList.deleteRow(newRow.rowIndex);
    });

    deleteCell.appendChild(deleteBtn);

    // Clearing input fields
    expenseName.value = '';
    expenseAmount.value = '';

    // Updating localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));
});

// Populating existing expenses on page load
let totalAmount = 0;
for (const expense of expenses) {
    totalAmount += expense.amount;

    const newRow = expenseList.insertRow();
    const nameCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    nameCell.textContent = expense.name;
    amountCell.textContent = expense.amount;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        expenses.splice(expenses.findIndex(exp => exp.name === expense.name && exp.amount === expense.amount), 1);

        let totalAmount = 0;
        for (const expense of expenses) {
            totalAmount += expense.amount;
        }
        totalAmountCell.textContent = totalAmount;

        expenseList.deleteRow(newRow.rowIndex);
    });

    deleteCell.appendChild(deleteBtn);
}

// Updating total amount on page load
totalAmountCell.textContent = totalAmount;