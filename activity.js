// Initialize starting balances
const initialCheckingBalance = 986;
const initialSavingsBalance = 11322;

// Load stored balances or initialize them
let checkingBalance = parseFloat(localStorage.getItem('checkingBalance')) || initialCheckingBalance;
let savingsBalance = parseFloat(localStorage.getItem('savingsBalance')) || initialSavingsBalance;

// Load monthly deposits from local storage or initialize an empty array
let deposits = JSON.parse(localStorage.getItem('monthlyDeposits')) || [];

// Update displayed balances on load
document.getElementById('checkingBalance').innerText = checkingBalance.toFixed(2);
document.getElementById('savingsBalance').innerText = savingsBalance.toFixed(2);

function addDeposit() {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    const savingsPercentage = parseInt(document.getElementById('savingsPercentage').value);

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert('Please enter a valid deposit amount.');
        return;
    }

    // Update checking balance
    checkingBalance += depositAmount;
    localStorage.setItem('checkingBalance', checkingBalance);

    // Calculate savings amount and update savings balance
    const savingsAmount = (savingsPercentage / 100) * depositAmount;
    savingsBalance += savingsAmount;
    localStorage.setItem('savingsBalance', savingsBalance);

    // Save deposit record
    deposits.push({
        date: new Date().toISOString().split('T')[0],
        amount: depositAmount,
        savingsPercentage: savingsPercentage
    });
    localStorage.setItem('monthlyDeposits', JSON.stringify(deposits));

    // Update displayed balances
    document.getElementById('checkingBalance').innerText = checkingBalance.toFixed(2);
    document.getElementById('savingsBalance').innerText = savingsBalance.toFixed(2);
}

function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
    }

    // Deduct from checking balance
    checkingBalance -= expenseAmount;
    localStorage.setItem('checkingBalance', checkingBalance);
    
    // Update displayed balance
    document.getElementById('checkingBalance').innerText = checkingBalance.toFixed(2);

    // You can store expenses similarly in localStorage if needed
}

function resetAllInformation() {
    // Reset balances to initial values
    checkingBalance = initialCheckingBalance;
    savingsBalance = initialSavingsBalance;

    // Reset localStorage
    localStorage.removeItem('checkingBalance');
    localStorage.removeItem('savingsBalance');
    localStorage.removeItem('monthlyDeposits');

    // Update displayed balances
    document.getElementById('checkingBalance').innerText = checkingBalance.toFixed(2);
    document.getElementById('savingsBalance').innerText = savingsBalance.toFixed(2);

    // Optionally clear input fields
    document.getElementById('depositAmount').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'eating out';
    document.getElementById('savingsPercentage').value = '0';
}
