import React from "react";

const Shop = () => {
  return (
    <>
      {" "}
      <section className="shop">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">Shop</h2>
          </div>
          <div className="section-body">
            <div className="shops">
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://picsum.photos/id/12/665/500"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://picsum.photos/id/13/665/500"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://picsum.photos/id/14/665/500"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
              <div className="shop-item">
                <a href="#" className="shop__link">
                  <img
                    src="https://picsum.photos/id/15/665/500"
                    alt="#"
                    className="shop__image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*End .shop*/}
    </>
  );
};

export default Shop;
