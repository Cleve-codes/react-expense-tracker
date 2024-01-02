import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-black ml-[15%] mt-[2em] mr-[5%] min-h-[70vh]">
          <Nav />
          <Outlet />
        </div>
        <div className="home min-h-[30vh]"></div>
      </div>
    </>
  );
};

export default HomePage;
