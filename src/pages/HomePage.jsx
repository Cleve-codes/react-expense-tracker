import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-black mx-[5%] sm:ml-[15%] md:mx-[5%] md:gap-[2em] mt-[2em] sm:mr-[5%] min-h-[70vh]">
          <Nav />
          <Outlet />
        </div>
        <div className="home min-h-[30vh]"></div>
      </div>
    </>
  );
};

export default HomePage;
