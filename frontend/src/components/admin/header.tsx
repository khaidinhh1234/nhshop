import { Logo } from "../Icons";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="flex justify-content-between border-b-2 ">
          <div className="  flex">
            <div className=" p-4 pe-5 ">
              {" "}
              <img src={Logo} alt="" />
            </div>
            <div className="ps-5 pt-4 ">
              {" "}
              <div className="input-group  ">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Tìm kiếm..."
                  name="q"
                />
                <div className="input-group-append ">
                  <button className="btn btn-secondary " type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className=" me-20 mt-4">
            <Link to="/" className="text-center btn btn-secondary ">
              {/* <img src={brack} alt="" className="w-5" /> */}

              <span> Thoát</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
