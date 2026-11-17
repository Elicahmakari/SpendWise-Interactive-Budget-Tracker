
// ==========================================
// SPENDWISE - INTERACTIVE BUDGET TRACKER
// ==========================================

// 1. ARRAYS AND APPLICATION DATA

let expenses = JSON.parse(localStorage.getItem("spendwiseExpenses")) || [];

let monthlyBudget = Number(localStorage.getItem("spendwiseBudget")) || 0;


// 2. SELECT HTML ELEMENTS USING THE DOM

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const totalBudgetElement = document.getElementById("totalBudget");
const totalExpensesElement = document.getElementById("totalExpenses");
const remainingBalanceElement = document.getElementById("remainingBalance");
const expenseCountElement = document.getElementById("expenseCount");

const expenseList = document.getElementById("expenseList");
const progressBar = document.getElementById("progressBar");
const budgetPercentage = document.getElementById("budgetPercentage");
const budgetMessage = document.getElementById("budgetMessage");

const clearExpensesButton = document.getElementById("clearExpenses");


// 3. HELPER FUNCTION TO FORMAT CURRENCY

function formatCurrency(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// 4. CALCULATE TOTAL EXPENSES USING A LOOP

function calculateTotalExpenses() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    return total;
}


// 5. UPDATE DASHBOARD USING DOM MANIPULATION

function updateDashboard() {

    const totalExpenses = calculateTotalExpenses();

    const remainingBalance = monthlyBudget - totalExpenses;

    totalBudgetElement.textContent = formatCurrency(monthlyBudget);

    totalExpensesElement.textContent = formatCurrency(totalExpenses);

    remainingBalanceElement.textContent = formatCurrency(remainingBalance);

    expenseCountElement.textContent = expenses.length;


    // CONDITIONAL STATEMENTS FOR BUDGET FEEDBACK

    if (monthlyBudget <= 0) {

        budgetMessage.textContent =
            "Please set your monthly budget to start tracking.";

        budgetPercentage.textContent = "0%";

        progressBar.style.width = "0%";

        progressBar.style.background = "#20aa7d";

    } else {

        const percentage = (totalExpenses / monthlyBudget) * 100;

        const displayedPercentage = Math.round(percentage);

        budgetPercentage.textContent = displayedPercentage + "%";

        // Prevent the progress bar from exceeding 100%

        progressBar.style.width = Math.min(percentage, 100) + "%";


        if (percentage >= 100) {

            budgetMessage.textContent =
                "Warning! You have exceeded your monthly budget.";

            progressBar.style.background = "#dc3545";

        } else if (percentage >= 80) {

            budgetMessage.textContent =
                "Warning! You have used most of your budget. Spend carefully.";

            progressBar.style.background = "#f0a52b";

        } else if (percentage >= 50) {

            budgetMessage.textContent =
                "You are making progress. Keep monitoring your spending.";

            progressBar.style.background = "#3188cf";

        } else {

            budgetMessage.textContent =
                "Great job! Your spending is within a healthy range.";

            progressBar.style.background = "#20aa7d";
        }
    }


    // CONDITIONAL DECISION FOR REMAINING BALANCE

    if (remainingBalance < 0) {

        remainingBalanceElement.style.color = "#dc3545";

    } else {

        remainingBalanceElement.style.color = "#159b72";
    }
}


// 6. DISPLAY EXPENSE RECORDS USING A LOOP

function displayExpenses() {

    expenseList.innerHTML = "";

    // Check whether the array contains records

    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <tr>
                <td colspan="5" class="empty-message">
                    No expenses recorded yet.
                </td>
            </tr>
        `;

        return;
    }


    // LOOP THROUGH ALL EXPENSE RECORDS

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatCurrency(expense.amount);

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-button";

        deleteButton.type = "button";

        deleteButton.addEventListener("click", function() {

            deleteExpense(expense.id);

        });


        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(dateCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        expenseList.appendChild(row);

    });
}


// 7. SAVE DATA TO LOCAL STORAGE

function saveData() {

    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );

    localStorage.setItem(
        "spendwiseBudget",
        monthlyBudget
    );
}


// 8. ADD NEW EXPENSE USING FORM EVENT

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();

    const amount = Number(expenseAmount.value);

    const category = expenseCategory.value;

    const date = expenseDate.value;


    // CONDITIONAL VALIDATION

    if (name === "" || amount <= 0 || !category || !date) {

        alert("Please enter valid information for all expense fields.");

        return;
    }


    // CREATE A NEW EXPENSE OBJECT

    const newExpense = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: date

    };


    // STORE THE EXPENSE IN THE ARRAY

    expenses.push(newExpense);


    // SAVE AND UPDATE THE DASHBOARD

    saveData();

    displayExpenses();

    updateDashboard();


    // RESET FORM

    expenseForm.reset();

    expenseDate.value = new Date().toISOString().split("T")[0];

    alert("Expense added successfully!");

});


// 9. UPDATE MONTHLY BUDGET USING FORM EVENT

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newBudget = Number(budgetInput.value);


    if (newBudget <= 0 || !Number.isFinite(newBudget)) {

        alert("Please enter a valid budget greater than zero.");

        return;
    }


    monthlyBudget = newBudget;

    saveData();

    updateDashboard();

    budgetForm.reset();

    alert("Your monthly budget has been updated!");

});


// 10. DELETE INDIVIDUAL EXPENSE

function deleteExpense(expenseId) {

    const confirmed = confirm(
        "Are you sure you want to delete this expense?"
    );

    if (confirmed) {

        expenses = expenses.filter(function(expense) {

            return expense.id !== expenseId;

        });

        saveData();

        displayExpenses();

        updateDashboard();

    }
}


// 11. CLEAR ALL EXPENSES

clearExpensesButton.addEventListener("click", function() {

    if (expenses.length === 0) {

        alert("There are no expenses to clear.");

        return;
    }


    const confirmed = confirm(
        "Are you sure you want to delete all expense records?"
    );


    if (confirmed) {

        expenses = [];

        saveData();

        displayExpenses();

        updateDashboard();

        alert("All expenses have been cleared.");

    }
});


// 12. INITIALIZE APPLICATION WHEN PAGE LOADS

function initializeApp() {

    budgetInput.value = monthlyBudget > 0 ? monthlyBudget : "";

    expenseDate.value = new Date().toISOString().split("T")[0];

    displayExpenses();

    updateDashboard();

}


// START THE APPLICATION

initializeApp();
