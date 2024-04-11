import React from "react";

const Services = () => {
  return (
    <>
      {" "}
      <section className="services">
        <div className="container-fluid">
          <div className="service-list">
            <div className="service-item">
              <img
                src="./public/images/sevicse 1.svg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">High Quality</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="./public/images/secvise 2.svg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">High Quality</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="./public/images/secvise 3.svg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">High Quality</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
            <div className="service-item">
              <img
                src="./public/images/secvise 4.svg"
                className="service__image"
              />
              <div className="service-info">
                <h4 className="service__name">High Quality</h4>
                <p className="service__description">
                  crafted from top materials
                </p>
              </div>
            </div>
            {/*End service-item*/}
          </div>
        </div>
      </section>
      {/*End .services*/}
    </>
  );
};

export default Services;
