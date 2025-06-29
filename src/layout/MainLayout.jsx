import { Outlet } from "react-router-dom";
import Navbar from "../component/shared/navbar/navbar";
import Footer from "../component/shared/footer/footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
