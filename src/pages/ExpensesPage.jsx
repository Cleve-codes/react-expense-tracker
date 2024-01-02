// React Router
import { Link, useNavigate, useParams } from "react-router-dom";

// Components
import Button from "../components/Button";
import Table from "../components/Table";

// Context
import { useHomeContext } from "../context/HomeContext";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const contextData = useHomeContext()
  const expenses = contextData.expenses;
  const { id } = useParams();

  const showBudgetName = id == undefined;

  if(expenses.length === 0) {
    return navigate(-1)
  }

  return (
    <>
      <div className="grid-lg">
        <h1 className="text-[40px] font-bold">All Expenses</h1>
        {expenses && expenses.length > 0 && (
          <>
            <div className="grid-md">
              <h2 className="text-[30px] font-semibold">
                Recent Expense <small>({expenses.length} total)</small>
              </h2>
              <Table showBudgetName={showBudgetName} />
            </div>

            <div>
              <Link text="Go Back" to="/home/budgets" />
            </div>
          </>
        )}
      </div>
      <Button text="Go Back" onClick={() => navigate("/home/budgets")} />
    </>
  );
};

export default ExpensesPage;
