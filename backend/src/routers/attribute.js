import { Router } from "express";
import {
  createAttribute,
  createValueAttribute,
  deleteAttribute,
  getAllattributes,
  getAttributeById,
  updateAttribute,
} from "../controllers/attribute";
const route = Router();
// Route để tạo mới một thuộc tính
route.post("/attributes", createAttribute);
// Route để thêm giá trị cho thuộc tính đã tồn tại
route.post("/attributes/:id/values", createValueAttribute);
// Route để lấy tất cả các thuộc tính
route.get("/attributes", getAllattributes);
// Route để lấy một thuộc tính theo ID
route.get("/attributes/:id", getAttributeById);

// Route để cập nhật một thuộc tính theo ID
route.put("/attributes/:id", updateAttribute);

// Route để xóa một thuộc tính theo ID
route.delete("/attributes/:id", deleteAttribute);
export default route;
