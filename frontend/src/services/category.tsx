import instance from "@/config/axios";

export const getCategorys = async () => {
  try {
    const { data } = await instance.get(
      "http://localhost:8080/api/v1/category"
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getCategoryById = async (id: string | number) => {
  try {
    const { data } = await instance.get(
      `http://localhost:8080/api/v1/category/${id}`
    );
    return data;
  } catch (error) {
    return error;
  }
};
