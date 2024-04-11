import { getAllProducts, getProduct } from "@/services/products";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProductAllQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["PRODUCT_KEY"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/productsall"
      );
      return data;
    },
  });
  return { data, ...rest };
};
export default useProductAllQuery;
export const useProductQuery = (params?: any) => {
  const { data, ...rest } = useQuery({
    // queryKey: ["PRODUCT_KEY", id],
    queryKey: ["PRODUCT_KEY", params],
    queryFn: async () => {
      // return id ? await getProductById(id as number | string) : await getAllProducts()
      return params?.id
        ? await getProduct(params.id as string)
        : await getAllProducts(params);
    },
  });
  return { data, ...rest };
};
