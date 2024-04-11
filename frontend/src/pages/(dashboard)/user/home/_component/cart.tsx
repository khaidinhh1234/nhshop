import { Delete } from "@/assets/img";
import useCart from "@/common/hooks/useCart";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    data,
    calculateTotal,
    isLoading,
    isError,
    mutate,
    handleQuantityChange,
  } = useCart();
  console.log(data);
  if (isLoading)
    <div>
      <p>Loading....</p>
    </div>;
  if (isError)
    <div>
      <p>Error....</p>
    </div>;

  return (
    <div>
      <section className="cart">
        <div className="container">
          <div className="cart-info">
            <div className="cart-table">
              <div className="cart-table-title">
                <span className="cart-table-title__name">Product</span>
                <span className="cart-table-title__price">Price</span>
                <span className="cart-table-title__name">Quantity</span>
                <span className="cart-table-title__name">Subtotal</span>
              </div>
              {data?.products.map((cart: any, i: number) => {
                return (
                  <div className="cart-table-body" key={i}>
                    <div className="cart-table_img">
                      <img
                        src={cart.image}
                        alt={cart.name}
                        className="cart-table_image"
                      />
                    </div>{" "}
                    <span className="cart-table_itemA">{cart.name}</span>
                    <span className="cart-table_itemB">
                      {cart.price.toLocaleString("vi-VN")}đ
                    </span>{" "}
                    <button
                      className=" bg-slate-500 w-5 me-2"
                      onClick={() =>
                        mutate({
                          action: "DECREMENT",
                          productId: cart.productId,
                        })
                      }
                    >
                      -
                    </button>{" "}
                    <span className="cart-table_itemC ">
                      {cart.quality}
                      <input
                        type="number"
                        onInput={(e) =>
                          handleQuantityChange(
                            cart.productId,
                            e as ChangeEvent<HTMLInputElement>
                          )
                        }
                      />
                    </span>
                    <button
                      className="bg-orange-600 w-5 ms-2"
                      onClick={() =>
                        mutate({
                          action: "INCREMENT",
                          productId: cart.productId,
                        })
                      }
                    >
                      +
                    </button>
                    <span className="cart-table_itemD">
                      {(cart.price * cart.quality).toLocaleString("vi-VN")}đ
                    </span>{" "}
                    <span className="cart-table_itemE">
                      <a
                        href="#"
                        onClick={() =>
                          mutate({
                            action: "REMOVEPRODUCT",
                            productId: cart.productId,
                          })
                        }
                      >
                        {" "}
                        <img src={Delete} alt="" />
                      </a>
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="cart-totals">
              <div className="cart-totals-title">Cart Totals</div>
              <div className="cart-totals-info">
                <div className="cart-totals_item">
                  <span className="cart-totals_name">Subtotal</span>
                  <span className="cart-totals_name">Total</span>
                </div>
                <div className="cart-totals_item">
                  <span className="cart-totals_priceA">
                    {" "}
                    {calculateTotal().toLocaleString("vi-VN")} đ
                  </span>
                  <span className="cart-totals_priceB">
                    {calculateTotal().toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
              <div className="cart-totals">
                <button className="cart-totals_btn">
                  <Link to="/order" className="cart-totals_link">
                    Check Out
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
