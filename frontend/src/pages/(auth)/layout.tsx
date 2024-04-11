import { Footer, Header } from "@/components";
import { Outlet } from "react-router-dom";

const LayoutWebsite = () => {
  return (
    <div>
      {/* <h1>hello\</h1> */}
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default LayoutWebsite;
