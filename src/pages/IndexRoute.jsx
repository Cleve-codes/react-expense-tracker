// Components
import ExpenseCard from "../components/ExpenseCard";
import BudgetCard from "../components/BudgetCard";

// Context
import { useHomeContext } from "../context/HomeContext";

const IndexRoute = () => {
  const { userName, budgets } = useHomeContext();

  return (
    <>
      <div>
        <h1 className="text-[55px] font-bold mt-[.5em]">
          Welcome back, <span>{userName}</span>
        </h1>
        {budgets.length === 0 && (
          <div className="mt-[1.5em]">
            <p className="text-[22px] leading-[.5em] xs:leading-[1em]">
              Personal budgeting is the secret to financial freedom.
            </p>
            <p className="text-[22px] leading-[3em]">
              Create a bugdet to get started
            </p>
          </div>
        )}
      </div>
      <div>
        <div className="mt-[2em] mr-[15%] grid grid-cols-1 2xl:grid-cols-2 2xl:justify-center gap-[2.5em]">
          <ExpenseCard />
          {budgets?.length > 0 && <BudgetCard id={undefined} />}
        </div>
      </div>
    </>
  );
};

export default IndexRoute;
