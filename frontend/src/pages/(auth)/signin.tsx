import { toast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/common/hooks/useStoratge";
import { IProduct } from "@/common/types/product";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [, setUser] = useLocalStorage("user", {});

  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: async (user: IProduct) => {
      try {
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/auth/signin",
          user
        );
        setUser(data);
        await toast({
          variant: "success",
          title: "Đăng Nhập thành công",
        });
        setTimeout(() => {
          nav("/");
        }, 1000);
        return data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: async (error) => {
      if (!error.response.data.messages) {
        toast({
          variant: "success",
          title: "Đăng Nhập thành công",
        });
      } else if (error) {
        const toasts = error.response.data.messages;
        toast({
          variant: "destructive",
          title: "Lỗi đăng Nhập ",
          description: toasts.map((item: any) => (
            <span>
              {item} <br />
            </span>
          )),
        });
      }
    },
  });
  const onSubmit = (user: IProduct) => {
    mutation.mutate(user);
    // console.log(user);
  };
  return (
    <div className="container">
      <h1 className="text-center mb-6">Đăng nhập</h1>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 flex justify-center">
          <label htmlFor="exampleInputEmail1" className="form-label me-24">
            Email :
          </label>
          <br />
          <input
            type="email"
            {...register("email")}
            className="form-control w-25"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-2 flex justify-center ">
          <label htmlFor="exampleInputPassword1" className="form-label me-16">
            Password :
          </label>
          <br />
          <input
            type="password"
            {...register("password")}
            className="form-control w-25"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-32 me-2">
          Đăng Nhập
        </button>
        <Link to={"/signup"} className="btn btn-primary w-32 ">
          Đăng Ký
        </Link>
      </form>
    </div>
  );
};

export default Signin;
