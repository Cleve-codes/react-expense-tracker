// React Router && React libs
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

// Components
import Table from "../components/Table";
import Button from "../components/Button";
import BudgetItem from "../components/BudgetItem";

// Context
import { useHomeContext } from "../context/HomeContext";

const ExistingBudgets = () => {
  const contextData = useHomeContext();
  const { userName, budgets } = contextData;
  const expenses = contextData.expenses;
  const navigate = useNavigate();

  const { id } = useParams();
  const showDelete = id !== undefined;
  const showBudgetName = id === undefined;

  useEffect(() => {
    if (budgets.length === 0) {
      navigate("/home");
    }
  }, [budgets, navigate]);


  return (
    <section className="mt-[2%]">
      <h1 className="text-[50px] mb-4">
        <span className="text-[55px] font-semibold">{userName}&apos;s</span>{" "}
        Existing Budgets
      </h1>
      <div className="budgets">
        {budgets.map((budg) => (
          <BudgetItem
            key={budg.id}
            budget={budg}
            budgetId={id}
            showDelete={showDelete}
          />
        ))}
      </div>
      <input type="hidden" name="_action" value="deleteExpense" />
      <input type="hidden" name="id" value={id} />
      {expenses && expenses.length > 0 ? (
        <div className="grid-md md:grid-sm xs:grid-xs">
          <h1 className="text-[50px] my-4">Recent Expenses</h1>
          <Table showBudgetName={showBudgetName} />
        </div>
      ) : null}
      <div className="mt-[2em] flex justify-between">
        <button
          className="custom-span flex items-center gap-[1em] hover:bg-gray-400 hover:text-gray-900 text-gray-800 font-bold py-4 px-8 rounded-md"
          onClick={() => navigate("/home")}
        >
          <MdArrowBack />
          Go Back
        </button>
        {expenses?.length > 6 ? (
          <Button
            text="View all expenses"
            to="/home/expense"
            showDelete={false}
          />
        ) : null}
      </div>
    </section>
  );
};

export default ExistingBudgets;
