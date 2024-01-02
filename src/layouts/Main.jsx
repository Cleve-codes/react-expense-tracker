//  Main Layout
import LoginPage from "../pages/LoginPage";

// React Router
import { Outlet } from "react-router-dom";


const Main = () => {
  return (
    <div>
      <LoginPage />
      <Outlet />
    </div>
  );
};

export default Main;
