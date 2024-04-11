import { useLocalStorage } from "@/common/hooks/useStoratge";
import { IProduct } from "@/common/types/product";
import { New } from "@/components";
import Banner2 from "@/pages/(website)/home/_component/Banner2";
import { getCategoryById } from "@/services/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Link, useParams } from "react-router-dom";

const CategoryDetail = () => {
  const [user] = useLocalStorage("user", {});
  const queryClient = useQueryClient();
  const userId = user.user._id;
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["CATEGORY_KEY", id],
    queryFn: async () => await getCategoryById(id as string),
  });
  if (isLoading) return <p>Loading...</p>;
  //   const listimg = product.gallery;
  //   console.log(listimg);
  console.log(data.products);
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
  console.log(data);
  return (
    <>
      <Banner2 />
      <section className="news">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title">
              Danh mục {data.category.name}
            </h2>
          </div>
        </div>{" "}
        {/* <New data={data.products}></New> */}
        <section className="news">
          <div className="container">
            <div className="section-body">
              <div className="products-list">
                {data.products?.map((product: IProduct, index: number) => {
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
          </div>
        </section>
      </section>
    </>
  );
};

export default CategoryDetail;
