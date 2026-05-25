import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const MainLayout = () => (
  <div className="page-wrapper">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default MainLayout;