import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaRegTrashAlt } from "react-icons/fa";

const Button = ({ text, to, onClick, disabled, icon, showDelete }) => {
  // const {id} = useParams()
  // console.log(id)

  if (to) {
    return (
      <Link
        to={showDelete ? `/home/budgets` : to}
        title={showDelete ? "Delete Budget" : text}
        className="cursor-pointer group relative inline-flex items-center gap-1.5 
        px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] 
        rounded-2xl hover:bg-opacity-70 
        transition font-semibold shadow-md"
        onClick={onClick}
        // style={{
        //   backgroundColor: `hsl(${})`
        // }}
      >
        {showDelete === true ? (
          <>
            Delete Budget
            <FaRegTrashAlt />
          </>
        ) : (
          <>
            {text}
            {icon}
          </>
        )}
      </Link>
    );
  } else {
    return (
      <button
        title={showDelete ? "Delete Budget" : text}
        className="cursor-pointer group relative inline-flex text-center gap-1.5 
        px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] 
        rounded-2xl hover:bg-opacity-70 
        transition font-semibold shadow-md mb-[1em]"
        onClick={onClick}
        disabled={disabled}
        // style={{
        //   backgroundColor: `hsl(${})`
        // }}
      >
        {disabled ? "Submitting..." : showDelete ? "Delete Budget" : text}
      </button>
    );
  }
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  showDelete: PropTypes.bool,
};
