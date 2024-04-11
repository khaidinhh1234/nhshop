import { useLocalStorage } from "@/common/hooks/useStoratge";
import { IProduct } from "@/common/types/product";
import { getAllProducts } from "@/services/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

type ProductListProp = {
  featured?: boolean;
  data?: IProduct[];
  products?: IProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
};
const New = ({ products, pagination }: ProductListProp) => {
  const [user] = useLocalStorage("user", {});
  const queryClient = useQueryClient();
  const userId = user.user._id;
  // console.log(user.user._id);
  // console.log(userId);
  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["PRODUCTs_KEY"],
  //   queryFn: getAllProducts,
  // });

  // add-to-cart
  const { mutate } = useMutation({
    mutationFn: async ({
      productId,
      quality,
    }: {
      productId: any;
      quality: number;
    }) => {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/carts/add-to-cart`,
        { userId, productId, quality }
      );
      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  // const filterredProducts = featured
  //   ? products?.filter((product: IProduct) => product?.featured == featured)
  //   : data
  //   ? data
  //   : products;

  // if (isLoading) return <h3 className="text-center">Loading...</h3>;
  // if (isError) return <p>error</p>;
  // if (!Array.isArray(products)) {
  //   return <p> console.error();</p>;
  // }

  const { totalPages } = pagination || { totalPages: 1 };
  return (
    <>
      <section className="news">
        <div className="container">
          <div className="section-body">
            <div className="products-list">
              {/* {filterredProducts?.map((product: IProduct, index: number) => { */}

              {products?.map((product: IProduct, index: number) => {
                return (
                  <div key={index} className="products-item">
                    <div className="products-image">
                      <img
                        src={product?.image}
                        alt="#"
                        className="products__thumbnail"
                      />
                      <span className="products-sale">
                        {product?.discount}%
                      </span>
                    </div>
                    <div className="products-info">
                      <h3 className="products__name">
                        <a href="#" className="products__link">
                          {product.name}
                        </a>
                      </h3>
                      <a href="#" className="products__category">
                        {product.description}
                      </a>
                      <div className="products-price">
                        <span className="products-price__new">
                          {(
                            product?.price -
                            product?.price * (product?.discount / 100)
                          ).toLocaleString()}{" "}
                          đ
                        </span>
                        <del className="products-price__old">
                          {product?.price.toLocaleString("vi-VN")} đ
                        </del>
                      </div>
                    </div>
                    <div className="products-actions">
                      <button className="btn products-action__quickview">
                        <Link
                          to={`/detail/${product._id}`}
                          className="products-action__link"
                        >
                          Quick View
                        </Link>
                      </button>
                      <button className="btn products-action__addtocart">
                        <a
                          href=""
                          className="products-action__link"
                          onClick={() =>
                            mutate({ productId: product._id, quality: 1 })
                          }
                        >
                          Add to Cart
                        </a>
                      </button>
                      <div className="products-actions-more">
                        <span className="products-action__share">Share</span>
                        <span className="products-action__compare">
                          Compare
                        </span>
                        <span className="products-action__like">Like</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/*End .product-item*/}
            </div>{" "}
          </div>{" "}
          <div className="pagination">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </section>
      {/*End .news*/}
    </>
  );
};

export default New;
