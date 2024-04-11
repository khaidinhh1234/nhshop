import useCart from "@/common/hooks/useCart";
import { useLocalStorage } from "@/common/hooks/useStoratge";
import { IProduct } from "@/common/types/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Bill = () => {
  const { register, handleSubmit } = useForm();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user._id;
  const nav = useNavigate();
  const { data, calculateTotal } = useCart();
  console.log(data.products);
  const length = data?.products ? data.products.length : 0;
  const { mutate } = useMutation({
    mutationFn: async (order: {
      userId: string;
      items: [];
      totalPrice: number;
      customerInfo: object;
    }) => {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/orders",
        order
      );
      return data;
    },
    onSuccess: () => {
      alert("Đặt hàng thành công ");
      nav("/thankyou");
    },
  });
  const onsubmit = async (formdata: Object) => {
    mutate({
      userId,
      items: data.products,
      totalPrice: calculateTotal(),
      customerInfo: formdata,
    });
  };
  return (
    <>
      {" "}
      <div className="container-fluid">
        <section className="bill">
          {" "}
          <form action="" method="post" onSubmit={handleSubmit(onsubmit)}>
            <div className="container">
              <div className="bill-info">
                <div className="bill-details">
                  <div className="bill-title">
                    <h1 className="bill-title-h1">Billing details</h1>
                  </div>
                  <div className="bill-name">
                    <div className="bill-firstname">
                      <label htmlFor="firtname" className="bill-namelable">
                        First Name
                      </label>
                      <br />
                      <input
                        {...register("name")}
                        type="text"
                        className="bill-nameinput"
                        placeholder="Tên của bạn "
                        // value={users.name}
                      />
                    </div>
                    <div className="bill-lastname">
                      <label htmlFor="lastname" className="bill-namelable">
                        Last Name
                      </label>
                      <br />

                      <input
                        type="text"
                        className="bill-nameinput"
                        placeholder="Họ của bạn "
                      />
                    </div>
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Company Name (Optional)
                    </label>
                    <br />

                    <input
                      type="text"
                      className="bill-forminput"
                      placeholder="Tên Công ty (nếu có) "
                    />
                  </div>
                  <div className="bill-form">
                    <label htmlFor="countryname" className="bill-formlable">
                      Country / Region
                    </label>
                    <br />
                    <select className="bill-formselect">
                      <option className="bill-formoption" value="#">
                        Việt Nam
                      </option>
                      <option className="bill-formoption" value="#">
                        China
                      </option>
                      <option className="bill-formoption" value="#">
                        USA
                      </option>
                      <option className="bill-formoption" value="#">
                        Nga
                      </option>
                    </select>
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Street address
                    </label>
                    <br />
                    <input
                      type="text"
                      className="bill-forminput"
                      placeholder="Địa chỉ của bạn "
                    />
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Town / City
                    </label>
                    <br />
                    <input
                      type="text"
                      className="bill-forminput"
                      placeholder="Thành Phố "
                      {...register("city")}
                    />
                  </div>
                  <div className="bill-form">
                    <label htmlFor="countryname" className="bill-formlable">
                      Province
                    </label>
                    <br />
                    <select className="bill-formselect">
                      <option className="bill-formoption" value="#">
                        Chương Mỹ
                      </option>
                      <option className="bill-formoption" value="#">
                        Hà Nội
                      </option>
                      <option className="bill-formoption" value="#">
                        Hà Nội
                      </option>
                      <option className="bill-formoption" value="#">
                        Hà Nội
                      </option>
                    </select>
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      ZIP code
                    </label>
                    <br />
                    <input
                      type="text"
                      className="bill-forminput"
                      placeholder="Mã bưu điện "
                    />
                  </div>
                  <div className="bill-form">
                    <label htmlFor="comparyname" className="bill-formlable">
                      Phone
                    </label>
                    <br />
                    <input
                      type="tel"
                      className="bill-forminput"
                      placeholder="số điện thoại  "
                      {...register("phone")}
                    />
                  </div>
                  <div className="bill-form">
                    <label htmlFor="emailname" className="bill-formlable">
                      Email address
                    </label>
                    <br />
                    <input
                      type="email"
                      className="bill-forminput"
                      placeholder="Email "
                      {...register("email")}
                      // value={users.email}
                    />
                  </div>
                  <div className="bill-additional">
                    <input
                      type="text"
                      className="bill-forminput"
                      placeholder="Additional information"
                    />
                  </div>
                </div>
                <div className="bill-checkout">
                  {" "}
                  <div className=" border-1 border-orange-400 w-75 rounded-md ">
                    {data.products.map((item: IProduct) => (
                      <div className="flex p-2 border-2 ">
                        <div className="p-2">
                          <img src={item.image} alt="" width={100} />
                        </div>
                        <div className="p-4">
                          {" "}
                          <h4>{item.name}</h4>
                          <span>{item.price.toLocaleString("vi-VN")} đ</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-2">
                      <span>Sản phẩm : {length}</span>
                      <br />
                      <span>Thuế VAT (tạm tính) : 100.000 đ </span>
                      <h5>
                        {" "}
                        Tổng tiền:{" "}
                        {(100000 + calculateTotal()).toLocaleString("vi-VN")} đ
                      </h5>
                    </div>
                  </div>
                  <div className="bill-total">
                    <div className="bill-total-name pt-2">
                      <span className="bill-name_products">Product</span>{" "}
                      {data.products.map((item: IProduct) => (
                        <p>
                          <span className="bill-name_asgaard">
                            {item.name}{" "}
                          </span>{" "}
                          x {item.quality}
                        </p>
                      ))}
                      <span className="bill-name_total">Subtotal</span>
                      <span className="bill-name_total">Total</span>
                    </div>

                    <div className="bill-price">
                      <span className="bill-name_products">Subtotal</span>
                      {data.products.map((item: any) => (
                        <span className="bill-price_item">
                          {(item.price * item.quality).toLocaleString("vi-VN")}{" "}
                          đ
                        </span>
                      ))}
                      <span className="bill-price_item">
                        {" "}
                        {(100000 + calculateTotal()).toLocaleString("vi-VN")} đ
                      </span>
                      <span className="bill-price_total">
                        {(100000 + calculateTotal()).toLocaleString("vi-VN")} đ
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="bill-bank">
                    <div className="bill-bank-radio">
                      <span className="bill-bank-black">
                        <img src="./public/images/checkout/cham.svg" alt="" />
                      </span>
                      <span className="bill-bank_name">
                        Direct Bank Transfer
                      </span>
                    </div>
                    <p className="bill-bank_des1">
                      Make your payment directly into our bank account. Please
                      use your Order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                    <div className="bill-bank-radio">
                      <input
                        type="radio"
                        name="abc"
                        className="bill-bank_input"
                      />
                      <span className="bill-bank_name">
                        Direct Bank Transfer
                      </span>
                    </div>
                    <div className="bill-bank-radio">
                      <input
                        type="radio"
                        name="abc"
                        className="bill-bank_input"
                      />
                      <span className="bill-bank_name">Cash On Delivery</span>
                    </div>
                    <p className="bill-bank_des2">
                      Your personal data will be used to support your experience
                      throughout this website, to manage access to your account,
                      and for other purposes described in our privacy policy.
                    </p>
                  </div>
                  <div className="bill-btn">
                    <button type="submit" className="bill-button">
                      Place order
                    </button>
                  </div>
                </div>
              </div>
            </div>{" "}
          </form>
        </section>
      </div>
    </>
  );
};

export default Bill;
