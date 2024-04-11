import Footer from "@/components/admin/footer";
import Header from "@/components/admin/header";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>{" "}
      <Footer />
    </div>
  );
};

export default LayoutAdmin;
