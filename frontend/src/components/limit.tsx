import useProductAllQuery from "@/common/hooks/useProductQuery";
import { getCategorys } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const LimitWeb = ({ handleLimitChange, limit, products }: any) => {
  const length = products ? products.length : 0;
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["CATEGORY_KEY"],
    queryFn: async () => {
      const category = await getCategorys();
      return category;
    },
    staleTime: 60000, // Thời gian "cũ" được đặt là 1 phút (60000 miligiây)
  });
  const { data } = useProductAllQuery();
  const lengthall = data ? data.length : 0;
  // console.log(lengthall);
  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <p>Error....</p>;
  }
  return (
    <div>
      {" "}
      <section className="content">
        <div className="container">
          <div className="content-list">
            <div className="content-item">
              <div className="content-item-filter">
                <a href="#">
                  <img src="./public/images/shop/icon1.svg" alt="" />
                </a>
              </div>
              <div className="content-item-filter">
                <span className="content-item-filter__label">Filter</span>
              </div>
              <div className="content-item-filter">
                <a href="#">
                  <img
                    src="./public/images/shop/icon2.svg"
                    alt=""
                    className="content-item-filter__icon2"
                  />
                </a>
              </div>
              <div className="content-item-filter">
                <a href="#">
                  <img
                    src="./public/images/shop/icon3.svg"
                    alt=""
                    className="content-item-filter__icon3"
                  />
                </a>
              </div>
              <div className="content-item-filter">
                <span className="content-item-filter__results">
                  Showing 1 – {length} of {lengthall} results
                </span>
              </div>
            </div>
            <div className="content-item">
              <div className="content-show">
                <p className="content-show__label">Show</p>
                <select
                  id="limit"
                  onChange={handleLimitChange}
                  defaultValue={limit}
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="limit-dropdown"></div>
              <div className="content-show">
                <p className="content-show__label">Short by</p>
                <select name="" id="">
                  <option selected>Tất cả</option>
                  {categories?.map(
                    (category: { _id?: number; name: string }) => {
                      return (
                        <option key={category._id}>
                          <Link to={`/category/${category._id}`}>
                            <h3>{category.name}</h3>
                          </Link>
                        </option>
                      );
                    }
                  )}
                </select>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimitWeb;
