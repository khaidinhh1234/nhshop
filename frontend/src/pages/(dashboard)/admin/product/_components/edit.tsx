import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IProduct } from "@/common/types/product";
import { AddProduct, updateProduct } from "@/services/products";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "@tanstack/react-query";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { add } from "@/assets/admin/img";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductQuery } from "@/common/hooks/useProductQuery";
// import useProductQuery from "@/common/hooks/useProductQuery";
type Inputs = {
  name: string;
  price: number;
  category?: number;
  gallery?: string[];
  image: string;
  description: string;
  discount: number;
  featured: boolean;
  countInStock: number;
};
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string(),
  gallery: Joi.array().items(Joi.string()),
  image: Joi.string().required(),
  description: Joi.string(),
  featured: Joi.boolean(),
  discount: Joi.number(),
  countInStock: Joi.number(),
});
const ProductsEdit = () => {
  const { id } = useParams();
  console.log(id);
  const { toast } = useToast();
  const form = useForm({
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
  const { data } = useProductQuery(id);
  // console.log(data);
  useEffect(() => {
    form.reset(data);
  }, [id, form, data]);
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: async (product: IProduct) => {
      const { data } = await updateProduct(product);
      return data;
    },

    onSuccess: () => {
      console.log("Thêm thành công ");
      form.reset();
      toast({
        variant: "success",
        title: "Cập nhật sản phẩm thành công .....",
      });
      setTimeout(() => {
        nav("/admin/products");
      }, 1000);
    },
  });
  // const [imageUrl, setImageUrl] = useState(`${add}`); // Khởi tạo state với giá trị rỗng

  // const handleChange = (event: any) => {
  //   setImageUrl(event.target.value);
  // };

  const OnSubmit: SubmitHandler<Inputs> = (product: IProduct) => {
    mutation.mutate(product);
    console.log(product);
  };
  return (
    <>
      <div className="container my-4">
        <h2 className="m-2 text-slate-700">Cập nhật sản phẩm </h2>
        <hr />
        <div className="flex justify-between border-5 rounded-5 p-4">
          <div>
            {/* {imageUrl && (
              <img
                src={imageUrl}
                alt="Check lại link ảnh nhé bạn"
                style={{ maxWidth: "400px", display: "block" }}
              />
            )} */}
            <img src={add} alt="" />
          </div>
          <div
            className="w-75 ps-4
          "
          >
            <Form {...form}>
              <form
                action=""
                onSubmit={form.handleSubmit(OnSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name"> Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Tên sản phẩm"
                        ></Input>
                      </FormControl>{" "}
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="price"> Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="price"
                          placeholder="Giá sản phẩm"
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="category"> Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="category"
                          placeholder="Danh mục sản phẩm"
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description"> Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="description"
                          placeholder="Mô tả sản phẩm"
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="image"> Image</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="image"
                          placeholder="Hình ảnh sản phẩm"
                          // value={imageUrl}
                          // onChange={handleChange}
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>

                {/* <FormField
            control={form.control}
            name="gallery"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gallery"> gallery</FormLabel>
                <FormControl>
                  <Input {...field} id="gallery"></Input>
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          ></FormField> */}
                <FormField
                  control={form.control}
                  name="countInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="countInStock">
                        {" "}
                        countInStock
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="countInStock"
                          placeholder="Số lượng "
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="discount"> discount</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="discount"
                          placeholder="Giảm giá"
                        ></Input>
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      {/* <FormLabel htmlFor="featured"> featured</FormLabel> */}
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="featured"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel htmlFor="featured">Featured?</FormLabel>
                      </div>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <Button variant="destructive" type="submit">
                  Cập nhật
                </Button>
              </form>
            </Form>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default ProductsEdit;
