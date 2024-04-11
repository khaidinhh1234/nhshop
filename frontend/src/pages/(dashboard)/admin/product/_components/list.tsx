import useProductQuery from "@/common/hooks/useProductQuery";
import Datatable from "./Datatable";
import Footertable from "./Footertable";
import Headertable from "./Headertable";
import { columns } from "./Columm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ProductsList = ({ table, columns }: any) => {
  // const { data, isLoading, isError } = useProductQuery();
  // const queryClient = useQueryClient();
  // const { onRemove }: any = useMutation({
  //   mutationFn: async (product: any) => {
  //     const { data } = await axios.delete(`/products/${product._id}`);
  //     return data;
  //   },
  //   onSuccess: async () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["PRODUCT_KEY"],
  //     });
  //   },
  // });

  // const column = columns(onRemove);
  // console.log(column);
  // if (isLoading)
  //   return (
  //     <>
  //       <div>Loading...</div>
  //     </>
  //   );
  // if (isError) return <div>Error.</div>;
  return (
    <>
      <div className="p-3">
        <div className="w-full ">
          <div className="flex items-center py-4">
            <Headertable table={table} columns={columns} />
          </div>
          <div className="rounded-md border">
            <Datatable table={table} columns={columns} />
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Footertable table={table} />{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsList;
