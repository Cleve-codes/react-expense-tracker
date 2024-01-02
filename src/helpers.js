export const wait = (time) =>
  new Promise((res) => setTimeout(res, Math.random() * time));

export const generateRandomColor = () => {
  const existingBudgetsLength = localStorage.getItem("budgets")?.length ?? 0;
  return `${existingBudgetsLength * 34} 65% 50%`;
};

// LOCAL STORAGE FUNCTIONS
// Save Data in Local Storage
export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  if (!data) {
    throw new Error(`No data found for key "${key}"`);
  }
  return JSON.parse(data);
};

// Computation Functions
// Expenses by budget
export const getExpensesByBudget = (budgetId) => {
  const existingExpenses = fetchData("expenses") ?? [];
  const expenses = existingExpenses.filter(
    (expense) => expense.budgetId === budgetId
  );
  return expenses;
};

// Total Expense spent by budget
export const getTotalExpensesByBudget = (budgetId) => {
  const expenses = getExpensesByBudget(budgetId);
  const total = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
  return total;
};

// Total budget by Id
export const getTotalBudgetById = (budgetId) => {
  const existingBudgets = fetchData("budgets") ?? [];
  const budget = existingBudgets.find((budget) => budget.id === budgetId);
  return budget.amount;
};

// function to find budget by expense.budgetId
export const findBudgetById = (budgetId) => {
  const budgets = JSON.parse(localStorage.getItem("budgets"));
  const budget = budgets.find((budget) => budget.id === budgetId);
  return budget;
};

// find budgetColor by budgetId
export const findBudgetColorById = (budgetId) => {
  const budget = findBudgetById(budgetId);
  return budget?.color;
};

// Delete expense by budgetId
export const deleteExpenseByBudgetId = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const newExpenses = expenses.filter((expense) => expense.budgetId !== budgetId);
  return localStorage.setItem("expenses", JSON.stringify(newExpenses));
}


// Delete expense by expenseId
export const deleteExpenseByExpenseId = (expenseId) => {
  const expenses = fetchData("expenses") ?? [];

  const newExpenses = expenses.filter((expense) => expense.id !== expenseId);
  return localStorage.setItem("expenses", JSON.stringify(newExpenses));
}

// USER FUNCTIONS
// Create New User
export const createUser = async (name, email) => {
  const user = {
    name: name,
    email: email,
  };
  return user;
};

// Delete Item in Local Storage
export const deleteItem = ({ key } = {}) => {
  if (!key) {
    throw new Error("Please provide a key");
  }
  localStorage.removeItem(key);
};

// BUDGET FUNCTIONS
// Create New Budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// Create New Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };

  const existingBudgets = fetchData("budgets") ?? [];
  const existingExpenses = fetchData("expenses") ?? [];

  // console.log("existingBudgets:", existingBudgets);
  const budget = existingBudgets.some((budget) => budget.id === budgetId);

  if (
    budget
    // &&
    // getTotalExpensesByBudget(budgetId) + amount <= getTotalBudgetById(budgetId)
  ) {
    existingExpenses.push(newExpense);

    return localStorage.setItem("expenses", JSON.stringify(existingExpenses));
  } else {
    // console.log("Some error");
    throw new Error("Not enough balance");
  }
};

// FORMATTING FUNCTIONS
// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format Percentage
export const formatPercentage = (amount) => {
  return new Intl.NumberFormat(undefined, {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format Date
export const formatDateToLocaleString = (date) => {
  return new Date(date).toLocaleDateString();
};
