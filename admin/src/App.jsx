import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
function App() {

  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Outlet  />
        </div>
      </div>
    </>
  );
}

export default App;
