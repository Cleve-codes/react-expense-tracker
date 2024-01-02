// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import Main from "./layouts/Main";

// Pages (Routes)
import IndexRoute from "./pages/IndexRoute";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ExpensesPage from "./pages/ExpensesPage";
import BudgetOverviewPage from "./pages/BudgetOverviewPage";
import ExistingBudgets from "./pages/ExistingBudgets";

// React Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { HomeProvider } from "./context/HomeContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <IndexRoute />,
      },
      {
        path: "budgets",
        element: <ExistingBudgets />,
        errorElement: <ErrorPage />,
      },
      {
        path: "expense",
        element: <ExpensesPage />,
      },
      {
        path: ":id",
        element: <BudgetOverviewPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <div>
      <HomeProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </HomeProvider>
    </div>
  );
}
