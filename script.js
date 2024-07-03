document.addEventListener('DOMContentLoaded', (event) => {
    loadExpensesFromLocalStorage();
});

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    const description = document.getElementById('description').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const value = parseFloat(document.getElementById('value').value);
    const currencyFrom = document.getElementById('currency-from').value;
    const currencyTo = document.getElementById('currency-to').value;
    const id = document.getElementById('expense-id').value;

    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currencyTo];
            const convertedValue = value * rate;
            const expense = { id: id || generateUniqueId(), description, quantity, value, currencyFrom, currencyTo, convertedValue };
            
            if (id) {
                updateExpenseInLocalStorage(expense);
            } else {
                saveExpenseToLocalStorage(expense);
                addExpenseToList(expense);
            }
            updateTotal();
            clearForm();
        })
        .catch(error => console.error('Erro ao obter taxa de câmbio:', error));
});

function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function addExpenseToList({ id, description, quantity, value, currencyFrom, convertedValue, currencyTo }) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.setAttribute('data-id', id);
    li.innerHTML = `${description} - ${quantity} x ${value} ${currencyFrom} (${convertedValue.toFixed(2)} ${currencyTo}) 
                    <span><button onclick="editExpense(this)">✏️</button>
                    <button onclick="deleteExpense(this)">🗑️</button></span>`;
    expenseList.appendChild(li);
}

function updateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalOrigin = 0;
    let totalDestination = 0;
    expenses.forEach(expense => {
        totalOrigin += expense.value;
        totalDestination += expense.convertedValue;
    });
    document.getElementById('total-origin').textContent = totalOrigin.toFixed(2);
    document.getElementById('total-destination').textContent = totalDestination.toFixed(2);
}

function editExpense(button) {
    const li = button.parentElement.parentElement;
    const id = li.getAttribute('data-id');
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses.find(exp => exp.id === id);

    document.getElementById('expense-id').value = expense.id;
    document.getElementById('description').value = expense.description;
    document.getElementById('quantity').value = expense.quantity;
    document.getElementById('value').value = expense.value;
    document.getElementById('currency-from').value = expense.currencyFrom;
    document.getElementById('currency-to').value = expense.currencyTo;
}

function deleteExpense(button) {
    const li = button.parentElement.parentElement;
    const id = li.getAttribute('data-id');
    li.remove();
    deleteExpenseFromLocalStorage(id);
    updateTotal();
}

function saveExpenseToLocalStorage(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateExpenseInLocalStorage(updatedExpense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.map(expense => expense.id === updatedExpense.id ? updatedExpense : expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    refreshExpenseList();
}

function deleteExpenseFromLocalStorage(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        addExpenseToList(expense);
    });
    updateTotal();
}

function refreshExpenseList() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';
    loadExpensesFromLocalStorage();
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('value').value = '';
    document.getElementById('currency-from').value = 'BRL';
    document.getElementById('currency-to').value = 'BRL';
    document.getElementById('expense-id').value = '';
}

function validateForm() {
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const value = document.getElementById('value').value;
    const currencyFrom = document.getElementById('currency-from').value;
    const currencyTo = document.getElementById('currency-to').value;

    if (!description || quantity <= 0 || value <= 0 || !currencyFrom || !currencyTo) {
        showAlert("Por favor, preencha todos os campos corretamente.");
        return false;
    }
    return true;
}

function showAlert(message) {
    document.getElementById('alert-message').textContent = message;
    document.getElementById('alert-popup').classList.remove('hidden');
}

function closeAlert() {
    document.getElementById('alert-popup').classList.add('hidden');
}