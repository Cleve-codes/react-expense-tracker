import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  findBudgetById,
  findBudgetColorById,
  formatCurrency,
  formatDateToLocaleString,
} from "../helpers";
import { Link } from "react-router-dom";
import { useHomeContext } from "../context/HomeContext";

const ExpenseItem = ({ expense, showBudgetName }) => {
  const budgetName = findBudgetById(expense.budgetId)?.name;
  const budgdetColor = findBudgetColorById(expense.budgetId);
  const { deleteExpense } = useHomeContext();
  //   console.log(expense);

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteExpense(expense.id);
  };


  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudgetName && (
        <td>
          <Link
            className="px-2 rounded-md "
            style={{ backgroundColor: `hsl(${budgdetColor})` }}
            to={`/home/${expense.budgetId}`}
          >
            {budgetName}
          </Link>
        </td>
      )}
      <td>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            title="Delete expense"
            className="hover:transform hover:scale-200"
          >
            <FaRegTrashAlt className="w-5 h-10 hover:transform hover:scale-200" />
          </button>
        </form>
      </td>
    </>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.object,
  showBudgetName: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default ExpenseItem;
