import { facebook, instagram, twitter } from "@/assets/img";

const Footer = () => {
  return (
    <>
      {" "}
      <div className=" container-fluid flex justify-between border-t-2 p-5">
        <span>© 2024 Company, Inc </span>
        <div className="flex">
          <span className="product-footer-sofa">
            <img src={facebook} alt="" />
          </span>{" "}
          <span className="product-footer-sofa">
            <img src={instagram} alt="" />
          </span>{" "}
          <span className="product-footer-sofa">
            <img src={twitter} alt="" />
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default Footer;
