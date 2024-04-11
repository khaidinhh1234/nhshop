import instance from "@/config/axios";
import { IProduct } from "@/common/types/product";

export const getAll = async () => {
  try {
    const response = await instance.get("/productsall");
    return response.data;
  } catch (error) {
    return error;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllProducts = async (params?: any): Promise<IProduct[]> => {
  try {
    const response = await instance.get("/products", { params });
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
// export const relatedProduct = async (id: string) => {
//   try {
//     const response = await instance.get(`/products/${id}/related`);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

export const AddProduct = async (product: IProduct) => {
  try {
    const response = await instance.post(`/products`, product);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updateProduct = async (product: string) => {
  try {
    const response = await instance.put(`/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    return error;
  }
};
