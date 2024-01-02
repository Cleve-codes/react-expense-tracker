import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHomeContext } from "../context/HomeContext";
import { toast } from "react-toastify";
import { wait } from "../helpers";

const ExpenseCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addBudget, budgets } = useHomeContext();

  const budgetsPresent = budgets.length >= 1;

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(e.target);
    try {
      await wait(2000);
      await addBudget(data.get("budget"), data.get("budgetAmount"));
      return toast.success(`Budget created succesfully`);
    } catch (e) {
      return toast.error(`Error creating budget`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form
        ref={formRef}
        name="newBudget"
        id="newBudget"
        className="bg-gray-300 rounded-xl shadow-2xl lg:p-2 xs:p-2 sm:p-4 lg:min-w-[600px] sm:min-w-[400px] xs:min-w-[250px]"
        onSubmit={handleSubmit}
      >
        <h1 className="font-semibold text-[25px] lg:text-start ml-0 sm:ml-[2em] xs:text-center xs:mt-[.25em]">
          Create a budget
        </h1>
        <div className="flex flex-col mx-[1em] sm:mx-[2em] mt-[2em] gap-[.5em] ">
          <label
            className="font-semibold text-[20px] text-gray-700"
            id="budgetName"
            htmlFor="budgetName"
          >
            Budget Name
          </label>
          <input
            className="rounded-lg outline-button px-8 py-4"
            type="text"
            name="budget"
            autoComplete="on"
            ref={focusRef}
            placeholder="e.g Groceries"
            required
          ></input>
        </div>
        <div className="flex flex-col mx-[1em] sm:mx-[2em] gap-[.5em]">
          <label
            className="font-semibold text-[20px] text-gray-700"
            htmlFor="budgetAmount"
            id="budgetAmount"
          >
            Amount
          </label>
          <input
            className=" outline-button px-8 py-4 rounded-lg"
            type="number"
            step={0.01}
            name="budgetAmount"
            id="budgetAmount"
            placeholder="Enter Amount"
            inputMode="decimal"
            autoComplete="on"
            required
          ></input>
          <input type="hidden" name="_action" value="addBudget" />
        </div>
        <div className="flex flex-row lg:flex-row sm:gap-2 sm:flex-col gap-2 ">
          <div className="sm:mt-[2em] sm:mx-[2em] xs:mx-[2em] ml-0 mt-[2em]">
            {/* <Button className="px-8 py-4" text="Create Budget 🪙" disabled={isSubmitting} /> */}
            <button
              className="cursor-pointer group relative flex gap-1.5 
                px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] 
                rounded-2xl hover:bg-opacity-70 
                transition font-semibold shadow-md
                lg:w-max w-full
                "
              type="submit"
            >
              {isSubmitting ? "Submitting..." : `Add A Budget 🪙`}
            </button>
          </div>
          {budgetsPresent && (
            <div className="mt-0 lg:mt-[2em]">
              <Link
                className="cursor-pointer group relative flex gap-1.5
                px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] 
                rounded-2xl hover:bg-opacity-70 
                transition font-semibold shadow-md lg:my-0 xs:mx-[2em]  xs:my-[2.5em] "
                to="/home/budgets"
              >
                View <span className="text-white xs:hidden">Existing</span>{" "}
                Budgets
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseCard;
