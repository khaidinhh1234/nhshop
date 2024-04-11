import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { CalendarIcon, FaceIcon, RocketIcon } from "@radix-ui/react-icons";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Command>
      <CommandList className="p-4 pt-3 ">
        <CommandItem>
          <CalendarIcon className="mr-2 h-10 w-4 " />

          <Link to={""} style={{ fontSize: "20px" }}>
            Thống kê
          </Link>
        </CommandItem>
        <CommandItem>
          <FaceIcon className="mr-2 h-10 w-4" />
          <span style={{ fontSize: "20px" }}>Sản Phẩm</span>
        </CommandItem>
        <CommandItem>
          <RocketIcon className="mr-2 h-10 w-4" />
          <span style={{ fontSize: "20px" }}>Thể Loại </span>
        </CommandItem>
      </CommandList>
    </Command>
  );
};

export default Sidebar;
