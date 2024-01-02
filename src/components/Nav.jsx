// React Router && React libs
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

// Assets
import Logo from "../assets/logomark.svg";

// Context
import { useHomeContext } from "../context/HomeContext";

const Nav = () => {
  const { deleteUser } = useHomeContext();
  const navigate = useNavigate();

  const handleSumit = (e) => {
    if (!confirm("Delete user and all data?")) {
      e.preventDefault();
      return;
    }
    deleteUser();
    navigate("/");
  };

  return (
    <nav className="flex  flex-row leading-normal items-center justify-between gap-2">
      <div className="flex flex-row gap-4 items-center">
        <img className="w-10 h-10" src={Logo} alt="Logo" />
        <h1 className="font-bold text-[25px]">HomeBudget</h1>
      </div>

      <form
        onSubmit={handleSumit}
        className="border-2 border-red-500 mr-[5%] rounded-xl"
      >
        <button
          type="submit"
          className="text-black px-8 py-4 flex  justify-center items-center gap-2"
          title="Delete Account"
        >
          <p className="font-bold text-[20px] sm:block hidden" to="/">
            Delete User
          </p>
          <FaRegTrashAlt className="text-red-500" />
        </button>
        
      </form>
    </nav>
  );
};

export default Nav;
