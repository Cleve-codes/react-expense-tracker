import { useNavigate, useParams } from "react-router-dom";
import { findBudgetById } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import BudgetCard from "../components/BudgetCard";
import Table from "../components/Table";

import { useHomeContext } from "../context/HomeContext";
import { useEffect } from "react";

const BudgetOverviewPage = () => {
  let { id } = useParams();
  const values = useHomeContext();
  const expenses = values.expenses;
  const budget = findBudgetById(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!budget) {
      navigate("/home/budgets");
    }
  }, [budget, navigate]);

  const showDelete = id !== undefined;
  const showBudgetName = id === undefined;

  return (
    <section>
      <div>
        <h1 className="text-[40px] my-[.7em] ml-[1em]">
          <span
            style={{
              color: `hsl(${budget?.color})`,
            }}
          >
            {budget?.name}
          </span>
          &nbsp;Overview
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start sm:gap-[.5em] lg:gap-0">
          <div className="mb-[4em] mx-[2em]">
            <BudgetItem budget={budget} showDelete={showDelete} budgetId={id} />
          </div>
          <div className="mr-[5%] mb-[5em]">
            <BudgetCard showBudgetCategory={false} budget={budget} id={id} />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-[30px] font-semibold">
          Recent{" "}
          <span
            style={{
              color: `hsl(${budget?.color})`,
            }}
          >
            {budget?.name}
          </span>{" "}
          Expense{" "}
          <small>
            ({expenses.filter((expense) => expense.budgetId === id).length}{" "}
            total)
          </small>
        </h1>
        <div className="grid-md">
          <Table showBudgetName={showBudgetName} />
        </div>
      </div>
      <div className="mt-[2em]">
        <button
          className="cursor-pointer group relative inline-flex items-center gap-1.5 
        px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] 
        rounded-2xl hover:bg-opacity-70 
        transition font-semibold shadow-md"
          onClick={() => navigate(-1)}
        >
          &lt;&nbsp;&nbsp;&nbsp;Go back
        </button>
      </div>
    </section>
  );
};

export default BudgetOverviewPage;
