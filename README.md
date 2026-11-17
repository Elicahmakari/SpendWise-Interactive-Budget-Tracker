
# SpendWise - Interactive Budget Tracker

## Project Overview

SpendWise is a personal budget tracking application developed using HTML, CSS, and JavaScript.

The application helps users manage their finances by setting monthly budgets, recording expenses, tracking spending, and monitoring their remaining balance.

The goal of this project is to demonstrate how JavaScript can make a website interactive and responsive to user actions.

## Improvements Made This Week

The following improvements were made to SpendWise:

1. Added an interactive monthly budget form.
2. Added an expense recording form.
3. Introduced expense categories such as Food, Transport, Education, Housing, and Shopping.
4. Added automatic calculation of total expenses.
5. Added remaining budget calculations.
6. Added a spending progress bar.
7. Introduced spending alerts when users approach or exceed their budgets.
8. Added the ability to delete individual expenses.
9. Added an option to clear all expense records.
10. Added Local Storage to preserve data after refreshing the page.
11. Improved the dashboard to display updated information dynamically.
12. Made the application responsive on mobile and desktop devices.

## JavaScript Concepts Implemented

### 1. Conditional Statements

Conditional statements are used to make decisions based on the user's financial information.

For example:

- If spending reaches or exceeds 100% of the budget, the application displays an overspending warning.
- If spending reaches 80% of the budget, the application displays a caution message.
- If spending is below 50%, the application displays a positive message.
- If the user has not entered a budget, the application requests that they set one.

The project uses `if`, `else if`, and `else` statements.

### 2. Arrays

An array called `expenses` stores multiple expense records.

Each expense is represented by an object containing:

- Expense ID
- Expense name
- Amount
- Category
- Date

The `push()` method adds new expenses, while the `filter()` method removes selected expenses.

### 3. Loops

The `forEach()` method is used to process all expense records.

It helps the application:

- Calculate total expenses.
- Display multiple expense records.
- Update the dashboard automatically.

This makes it easier to manage many expenses without creating separate variables for each record.

### 4. DOM Manipulation

The Document Object Model (DOM) allows JavaScript to interact with HTML elements.

The application uses:

- `document.getElementById()` to select HTML elements.
- `document.createElement()` to create expense table rows.
- `textContent` to update dashboard information.
- `innerHTML` to display messages.
- `appendChild()` to add expense records to the table.
- `style.width` to update the budget progress bar.

These methods allow information to appear directly on the webpage.

### 5. Event Handling

Event listeners allow users to interact with the application.

The project uses:

- `submit` events to handle budget and expense forms.
- `click` events to delete expenses and clear records.
- `preventDefault()` to prevent forms from automatically refreshing the page.
- `confirm()` to request confirmation before deleting records.

### 6. Local Storage

Local Storage is used to save expense records and monthly budget information in the browser.

The application uses:

- `localStorage.setItem()` to save information.
- `localStorage.getItem()` to retrieve saved information.
- `JSON.stringify()` to convert arrays into strings.
- `JSON.parse()` to convert stored strings back into JavaScript data.

This allows users to retain their records when they refresh the page or reopen it in the same browser.

## Challenges Encountered and Solutions

### Challenge 1: Calculating Multiple Expenses

Initially, calculating several expenses individually would require many variables.

**Solution:** I used arrays to store expense records and `forEach()` to calculate their total.

### Challenge 2: Updating Dashboard Information

The dashboard needed to reflect changes whenever a user added or deleted an expense.

**Solution:** I created reusable functions called `updateDashboard()` and `displayExpenses()`.

### Challenge 3: Handling User Input

Users could enter invalid amounts or leave required fields empty.

**Solution:** I implemented conditional statements to validate information before adding records.

### Challenge 4: Preserving Data

Expense records could disappear when the webpage was refreshed.

**Solution:** I implemented Local Storage to save and retrieve application data.

### Challenge 5: Monitoring Budget Limits

Users needed feedback when their expenses approached or exceeded their monthly budget.

**Solution:** I used conditional statements to calculate budget usage and display appropriate spending alerts.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Document Object Model (DOM)
- Browser Local Storage
- Git and GitHub

## How to Run the Project

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Ensure that all four project files are in the same folder.
4. Open `index.html` in your browser.
5. Enter a monthly budget.
6. Add expenses using the expense form.
7. View your dashboard updates.
8. Delete expenses or clear all records when necessary.

## Conclusion

SpendWise demonstrates how HTML, CSS, and JavaScript can work together to create an interactive budgeting application.

The project applies conditional statements, arrays, loops, DOM manipulation, event listeners, and Local Storage to provide a practical personal finance management solution.

It builds upon the previous SpendWise project by introducing dynamic functionality and improving the overall user experience.
