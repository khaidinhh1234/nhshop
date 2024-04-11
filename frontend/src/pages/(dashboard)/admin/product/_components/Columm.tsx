import { IProduct } from "@/common/types/product";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import instance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

export const columns: ColumnDef<IProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const { image } = row.original;
      //   console.log(image);
      return <img src={image} alt="" width={50} />;
    },
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      const { name } = row.original;
      return <h5>{name}</h5>;
    },
  },

  {
    accessorKey: "price",
    header: () => <div>Giá sản phẩm</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <h6>{formatted}</h6>;
    },
  },
  {
    accessorKey: "checked",
    header: "Trạng thái",
    cell: ({ row }) => {
      const { featured } = row?.original || {};
      return <div>{featured ? "checked" : "unchecked"}</div>;
    },
  },

  {
    accessorKey: "countInStock",
    header: () => <div>Số lượng </div>,
    cell: ({ row }) => {
      const countInStock = parseFloat(row.getValue("countInStock"));

      return <h6>{countInStock}</h6>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { _id } = row.original;
      // console.log(_id);
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: async (_id: string) => {
          const { data } = await instance.delete(`/products/${_id}`);
          return data;
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["PRODUCT_KEY"],
          });
        },
      });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Quản trị </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                window.confirm("Bạn có chắn chắn muốn xóa không !!") &&
                mutate(_id)
              }
            >
              Xoá sản phẩm
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`${_id}/edit`}>Sửa sản phẩm</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
