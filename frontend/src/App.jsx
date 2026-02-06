import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import { useSelector } from "react-redux";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
function App() {
  const loginValue = useSelector((store) => store.login);
  return (
    <>
      <ToastContainer />
      {loginValue ? <LoginPopup /> : <> </>}
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
