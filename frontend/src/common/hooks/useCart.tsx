import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useStoratge";
import { debounce, reduce } from "lodash";
import axios from "axios";
import { ChangeEvent } from "react";

const useCart = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  console.log(user?.user);
  const queryClient = useQueryClient();
  //list cart products
  const { data, ...resetQuery } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/carts/${userId}`
      );
      console.log(data);
      return data;
    },
  });

  const updateQuanlityDebounce = debounce(
    async (productId, quality: number) => {
      await axios.post("http://localhost:8080/api/v1/carts/update-quality", {
        userId,
        productId,
        quality,
      });
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
    300
  );

  const { mutate } = useMutation({
    mutationFn: async ({
      action,
      productId,
    }: {
      action: string;
      productId: string;
    }) => {
      switch (action) {
        case "INCREMENT":
          await axios.put("http://localhost:8080/api/v1/carts/increase", {
            userId,
            productId,
          });

          break;
        case "DECREMENT":
          await axios.put("http://localhost:8080/api/v1/carts/decrease", {
            userId,
            productId,
          });

          break;
        case "REMOVEPRODUCT":
          await axios.delete(
            "http://localhost:8080/api/v1/carts/remove-to-cart",
            { data: { userId, productId } }
          );

          break;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId],
      });
    },
  });

  const handleQuantityChange = (
    productId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(e.target.value);
    const quality = parseInt(e.target.value);
    updateQuanlityDebounce(productId, quality);
    // setEditQuantity({
    //   ...editQuantity,
    //   [productId]: quality,
    // });
  };

  const calculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, cart) => total + cart.price * cart.quality,
      0
    );
  };
  return { data, ...resetQuery, handleQuantityChange, mutate, calculateTotal };
};
export default useCart;
