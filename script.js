document.addEventListener("DOMContentLoaded", () => {
    const incomeForm = document.getElementById("incomeForm");
    const totalIncomeInput = document.getElementById("totalIncomeInput");
    const expenseTracker = document.querySelector(".expense-tracker");
    const totalIncomeSpan = document.getElementById("totalIncome");
    const netIncomeSpan = document.getElementById("netIncome");

    let totalIncome = 0;
    let totalExpenses = 0;
    let transactions = [];

    incomeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        totalIncome = parseFloat(totalIncomeInput.value);
        totalIncomeSpan.textContent = totalIncome.toFixed(2);
        netIncomeSpan.textContent = totalIncome.toFixed(2);
        totalIncomeInput.disabled = true;
        expenseTracker.style.display = "block";
    });

    const transactionForm = document.getElementById("transactionForm");
    const transactionsList = document.getElementById("transactions");
    const totalExpensesSpan = document.getElementById("totalExpenses");

    transactionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;
        const category = document.getElementById("category").value;
        const amount = parseFloat(document.getElementById("amount").value);

        const transaction = {
            id: Date.now(),
            description,
            date,
            category,
            amount
        };

        transactions.push(transaction);
        renderTransactions();
        updateSummary();

        transactionForm.reset();
    });

    function renderTransactions() {
        transactionsList.innerHTML = "";
        transactions.forEach(transaction => {
            const transactionItem = document.createElement("li");
            transactionItem.innerHTML = `
                ${transaction.date} - ${transaction.description} (${transaction.category}): Rs.${transaction.amount.toFixed(2)}
                <button class="edit-btn" data-id="${transaction.id}">Edit</button>
                <button class="delete-btn" data-id="${transaction.id}">Delete</button>
            `;
            transactionsList.appendChild(transactionItem);
        });
    }

    transactionsList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            const transaction = transactions.find(t => t.id === id);
            document.getElementById("description").value = transaction.description;
            document.getElementById("date").value = transaction.date;
            document.getElementById("category").value = transaction.category;
            document.getElementById("amount").value = transaction.amount;
            transactions = transactions.filter(t => t.id !== id);
            renderTransactions();
            updateSummary();
        }

        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.getAttribute("data-id"));
            transactions = transactions.filter(t => t.id !== id);
            renderTransactions();
            updateSummary();
        }
    });

    function updateSummary() {
        totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
        totalExpensesSpan.textContent = totalExpenses.toFixed(2);
        netIncomeSpan.textContent = (totalIncome - totalExpenses).toFixed(2);
    }
});
