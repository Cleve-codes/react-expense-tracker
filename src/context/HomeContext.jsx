// Context
import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { generateRandomColor } from "../helpers";

const HomeContext = createContext();

const initialState = {
  userName: "",
  budgets: [],
  expenses: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        userName: action.payload.userName,
      };
    case "ADD_BUDGET":
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "LOAD_BUDGETS":
      return {
        ...state,
        budgets: action.payload,
      };

    case "LOAD_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
      };

    case "DELETE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.budgetId !== action.payload
        ),
      };

    case "DELETE_USER":
      return {
        initialState,
      };

    default:
      return state;
  }
};

function HomeProvider({ children }) {
  const [{ expenses, budgets, userName }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const addUser = (userName, email) => {
    dispatch({ type: "ADD_USER", payload: { userName, email } });

    // Initilize expenses and budgets in localStorage
    if (!localStorage.getItem("expenses")) {
      localStorage.setItem("expenses", JSON.stringify([]));
    }

    if (!localStorage.getItem("budgets")) {
      localStorage.setItem("budgets", JSON.stringify([]));
    }

    localStorage.setItem("userName", JSON.stringify(userName));
  };

  const addBudget = (name, amount) => {
    const newBudget = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: new Date().toISOString(),
      amount: amount,
      color: generateRandomColor(),
    };

    dispatch({ type: "ADD_BUDGET", payload: newBudget });

    //Save to local storage
    const currentBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
    currentBudgets.push(newBudget);
    localStorage.setItem("budgets", JSON.stringify(currentBudgets));
  };

  const addExpense = (name, amount, budgetId) => {
    const newExpense = {
      id: crypto.randomUUID(),
      name: name,
      createdAt: new Date(),
      amount: amount,
      budgetId: budgetId,
    };

    dispatch({ type: "ADD_EXPENSE", payload: newExpense });

    //Save to local storage
    const currentExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    currentExpenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(currentExpenses));
  };

  const deleteUser = () => {
    dispatch({ type: "DELETE_USER" });
    localStorage.removeItem("userName");
    localStorage.removeItem("budgets");
    localStorage.removeItem("expenses");
  };

  const deleteBudget = (id) => {
    dispatch({ type: "DELETE_BUDGET", payload: id });
    const updatedBudgets = budgets.filter((budget) => budget.id !== id);
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

    // Delete all expenses related to the budget
    dispatch({ type: "DELETE_EXPENSE", payload: id });
    const updatedExpenses = expenses.filter(
      (expense) => expense.budgetId !== id
    );
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  useEffect(() => {
    const savedUserName = JSON.parse(localStorage.getItem("userName")) || "";
    if (savedUserName && savedUserName !== userName) {
      dispatch({ type: "ADD_USER", payload: { userName: savedUserName } });
    }
  }, [userName]);

  useEffect(() => {
    const savedBudgets = JSON.parse(localStorage.getItem("budgets")) || [];
    if (
      savedBudgets &&
      JSON.stringify(savedBudgets) !== JSON.stringify(budgets)
    ) {
      dispatch({ type: "LOAD_BUDGETS", payload: savedBudgets });
    }
  }, [budgets]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    if (
      savedExpenses &&
      JSON.stringify(savedExpenses) !== JSON.stringify(expenses)
    ) {
      dispatch({ type: "LOAD_EXPENSES", payload: savedExpenses });
    }
  }, [expenses]);

  return (
    <HomeContext.Provider
      value={{
        expenses,
        budgets,
        userName,
        addUser,
        addBudget,
        addExpense,
        deleteUser,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};

HomeProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { HomeProvider, useHomeContext };
