import {
  findBudgetById,
  formatCurrency,
  formatPercentage,
  getTotalExpensesByBudget,
} from "../helpers";
import PropTypes from "prop-types";
import { HiMiniBanknotes } from "react-icons/hi2";
import Button from "./Button";
import { useHomeContext } from "../context/HomeContext";

const BudgetItem = ({ budget, showDelete, budgetId }) => {
  const { deleteBudget } = useHomeContext();

  if (budget && budgetId === undefined) {
    var { id, name, amount, color } = budget;
    // console.log("true")
  } else {
    id = budgetId;
    amount = findBudgetById(id)?.amount;
    name = findBudgetById(id)?.name;
    color = findBudgetById(id)?.color;
  }

  let spent = getTotalExpensesByBudget(id);

  const handleDeleteBudget = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this budget?")) {
      deleteBudget(id);
    }
  };

  return (
    <>
      <div
        className="budget"
        style={{
          "--accent": color,
        }}
      >
        <div className="progress-text">
          <h1 className="text-[25px] font-bold">{name}</h1>
          <p className="text-[20px]">{formatCurrency(amount)} Budgeted</p>
        </div>
        <input type="hidden" name="_action" value="deleteBudget" />
        <input type="hidden" name="id" value={id} />
        <>
          <progress max={amount} value={spent}>
            {formatPercentage(spent / amount)}
          </progress>
          <div className="progress-text">
            <small>{formatCurrency(spent)} spent</small>
            <small>{formatCurrency(amount - spent)} remaining</small>
          </div>
          <div className="flex items-center justify-center">
            {/* <HiMiniBanknotes className="icon" /> */}
            <Button
              to={`/home/${id}`}
              text="View Details"
              icon={<HiMiniBanknotes />}
              showDelete={showDelete}
              onClick={showDelete ? handleDeleteBudget : null}
            />
          </div>
        </>
      </div>
    </>
  );
};

BudgetItem.propTypes = {
  budget: PropTypes.object,
  showDelete: PropTypes.bool,
  budgetId: PropTypes.string,
};

export default BudgetItem;
