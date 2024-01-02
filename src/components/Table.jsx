import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";
import { useHomeContext } from "../context/HomeContext";
import { useParams } from "react-router-dom";
import { getExpensesByBudget } from "../helpers";

const Table = ({ showBudgetName }) => {
  // const [expenses, setExpenses] = useState(initialExpenses);
  const contextData = useHomeContext();
  const { id } = useParams();
  const expenses = contextData.expenses.sort((a, b) => {
    a.createdAt - b.createdAt;
  });
  let fetchedExpenses = [];
  // console.log(expenses)

  const headers = ["Name", "Amount", "Date", ""];
  if (showBudgetName) {
    headers.splice(3, 0, "Budget");
  }

  if (id !== undefined) {
    fetchedExpenses = getExpensesByBudget(id);
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {headers.map((i, index) => (
              <th className="text-[30px]" key={index}>
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {id !== undefined
            ? fetchedExpenses
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((expense) => (
                  <tr className="text-[20px]" key={expense.id}>
                    <ExpenseItem
                      expense={expense}
                      showBudgetName={showBudgetName}
                      // onDelete={handleDelete}
                    />
                  </tr>
                ))
            : expenses.map((expense) => (
                <tr className="text-[20px]" key={expense.id}>
                  <ExpenseItem
                    expense={expense}
                    showBudgetName={showBudgetName}
                    // onDelete={handleDelete}
                  />
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  expenses: PropTypes.array,
  showBudgetName: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Table;
