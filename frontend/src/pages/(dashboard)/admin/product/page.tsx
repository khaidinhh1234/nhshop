import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./_components/Columm";
import ProductsList from "./_components/list";

import useProductQuery from "@/common/hooks/useProductQuery";

import Sidebar from "./_components/sidebar";

const PageAdmin = () => {
  const { data } = useProductQuery();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div>
      {/* <div>ProductsList</div>

    <Link to="/admin/products/add">thêm</Link>
    <Link to="/admin/products/edit">edit</Link> */}
      <ResizablePanelGroup direction="horizontal" className="container-fluid">
        <ResizablePanel defaultSize={17}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={83}>
          <ProductsList table={table} columns={columns} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PageAdmin;
