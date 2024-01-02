import Header from "../components/Header";
import Login from "../components/Login";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center ml-4 mr-4 justify-between">
        <Header />
        <Login />
      </div>
      <div className="home flex-1"></div>
    </main>
  );
};

export default LoginPage;
