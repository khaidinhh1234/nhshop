import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/product";
import { AddProduct, updateProduct } from "@/services/products";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

type useProductMutation = {
  action: "CREATE" | "UPDATE" | "DELETE";
};
const useProductMutations = ({ action }: useProductMutation) => {
  const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string(),
    gallery: Joi.array().items(Joi.string()),
    image: Joi.string(),
    description: Joi.string(),
    featured: Joi.boolean(),
    discount: Joi.number(),
    countInStock: Joi.number(),
  });
  const form =
    // register,
    // handleSubmit,
    // formState: { errors },
    useForm({
      resolver: joiResolver(productSchema),
      defaultValues: {
        name: "",
        price: 0,
        // gallery: [],
        category: "",
        image: "",
        description: "",
        discount: 0,
        featured: false,
        coutInStock: 0,
      },
    });
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, ...reset } = useMutation({
    mutationFn: async (product: IProduct) => {
      if (action === "CREATE") {
        const { data } = await AddProduct(product);
        console.log(data);
        return data;
      } else if (action === "UPDATE") {
        const data = await updateProduct(product);

        return data;
      }
    },
    onSuccess: async () => {
      setTimeout(() => {
        nav("/admin/products");
      }, 1000);
      queryClient.invalidateQueries({
        queryKey: ["PRODUCT_KEY"],
      });
    },
  });
  const onSubmit = (product: IProduct) => {
    mutate(product);
    console.log(product);
  };
  return { form, onSubmit, ...reset, mutate };
};
export default useProductMutations;
