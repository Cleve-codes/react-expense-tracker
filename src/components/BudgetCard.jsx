import { useFetcher, useLoaderData } from "react-router-dom";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getTotalExpensesByBudget, wait } from "../helpers";
import PropTypes from "prop-types";
import { useHomeContext } from "../context/HomeContext";

const BudgetCard = ({ showBudgetCategory = true, budget, id }) => {
  const { budgets, addExpense } = useHomeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectRef = useRef();

  const formRef = useRef();
  const focusRef = useRef();
  const budgetsPresent = localStorage.getItem("budgets").length > 2;

  let selectedOption =
    budget?.name || selectRef.current?.value || (budgets && budgets[0]?.name);

  const [selectedBudget, setSelectedBudget] = useState(
    selectedOption ? selectedOption : budgets ? [-1].name : null
  );

  // Dynamically set budgetId
  let budgetId = "";
  if (id !== undefined) {
    budgetId = id;
  }
  if (budgetsPresent) {
    const parsedBudgets = JSON.parse(localStorage.getItem("budgets"));
    if (
      parsedBudgets.length > 0
      // &&
      // Object.keys(parsedBudgets[0]).includes("name")
    ) {
      // budgetId = parsedBudgets[0].id;
      parsedBudgets.forEach((budg) => {
        if (selectedOption && budg.name === selectedOption) {
          budgetId = budg.id;
        }
      });
    }
  }

  function getTotalBudgetById(budgetId) {
    const budgets = JSON.parse(localStorage.getItem("budgets"));
    const budget = budgets.find((budg) => budg.id === budgetId);
    return budget ? budget.amount : 0;
  }

  const [disabled, setDisabled] = useState(false);
  //   getTotalBudgetById(budgetId) <= getTotalExpensesByBudget(budgetId) || false
  // );

  // Check if expense amount is greater than budget amount
  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    const remainingBudgetAmount =
      getTotalBudgetById(budgetId) - getTotalExpensesByBudget(budgetId);

    if (inputAmount > remainingBudgetAmount) {
      wait(500)
        .then(() => {
          setDisabled((disabled) => !disabled);
          return wait(1000);
        })
        .then(() => {
          e.target.value = "";
          setDisabled((disabled) => !disabled);
          formRef.current.reset();
          toast.warn("Not enough funds.");
        })
        .then(() => {
          return wait(2000);
        })
        .then(() => {
          toast.error("Check expenditure");
        });
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSelectChange = () => {
    const selectedOption = selectRef.current.value;
    setSelectedBudget(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.target);
    try {
      await wait(2000);
      await addExpense(
        data.get("newExpense"),
        data.get("newExpenseAmount"),
        budgetId
      );
      return toast.success(`${data.get("newExpense")} added as an expense`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper items-center">
      <form
        // method="post"
        ref={formRef}
        onSubmit={handleSubmit}
        className={`bg-gray-300 rounded-xl shadow-2xl w-full lg:max-w-[600px] md:max-w-[500px] sm:max-w-[400px] xs:max-w-[300px] lg:p-2 xs:p-2 sm:p-4 ${
          showBudgetCategory ? "lg:min-w-[600px]" : "lg:min-w-[400px]"
        } md:min-w-[400px] sm:min-w-[400px] xs:min-w-[250px]`}
      >
        <h1 className="font-semibold text-[25px] mx-[1em] mt-[.25em] sm:ml-[2em]">
          Add New{" "}
          <span>
            {budget
              ? budget.name
              : budgets?.length === 1
              ? `${budgets.map((budg) => budg.name)}`
              : selectedBudget}
          </span>{" "}
          Expense.
        </h1>
        <div className="flex flex-col lg:flex-row  justify-center mt-[2%]">
          <div className="flex flex-col mx-[2em] sm:ml-[2em]  gap-[.5em] ">
            <label
              className="font-semibold text-[20px] text-gray-700"
              name="expense"
              htmlFor="expense"
            >
              Expense Name
            </label>
            <input
              className="rounded-lg outline-button px-8 py-4"
              type="text"
              ref={focusRef}
              name="newExpense"
              autoComplete="on"
              required
              placeholder="e.g Groceries"
              // disabled={disabled}
            ></input>
          </div>
          <div className="flex flex-col mx-[2em] sm:ml-[2em] gap-[.5em]">
            <label
              className="font-semibold text-[20px] text-gray-700"
              name="amount"
              htmlFor="expenseAmount"
            >
              Amount
            </label>
            <input
              className="rounded-sm outline-button px-8 py-4"
              type="number"
              name="newExpenseAmount"
              step={0.01}
              inputMode="decimal"
              autoComplete="on"
              required
              placeholder="Enter Amount"
              onChange={handleAmountChange}
              disabled={disabled}
            ></input>
          </div>
          <input type="hidden" name="_action" value="addExpense" />
          <input type="hidden" name="budgetId" value={budgetId} />
        </div>
        {budgets?.length > 1 && showBudgetCategory && (
          <div className="ml-[3em] mt-[2em]">
            <h1 className="font-semibold text-[20px] text-gray-700">
              Budget Category
            </h1>
            <select
              name="newExpenseBudget"
              id="newExpenseBudget"
              className="min-w-[95%] px-8 py-4 bg-white mr-[2em] outline-button"
              onChange={handleSelectChange}
              ref={selectRef}
            >
              {/* <option>Home</option>
              <option>School</option> */}
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budg) => (
                  <option key={budg.id}>{budg.name}</option>
                ))}
            </select>
          </div>
        )}
        <div className="ml-[3em] mt-[2em]">
          <Button
            className="mb-[1em]"
            text={isSubmitting ? "Submitting..." : "Add Expense"}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

BudgetCard.propTypes = {
  showBudgetCategory: PropTypes.bool,
  budget: PropTypes.object,
};

export default BudgetCard;
