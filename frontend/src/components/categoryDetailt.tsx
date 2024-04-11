import { getCategorys } from "@/services/category";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const categoryDetailt = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["CATEGORY_KEY"],
    queryFn: async () => {
      const category = await getCategorys();
      return category;
    },
    staleTime: 60000, // Thời gian "cũ" được đặt là 1 phút (60000 miligiây)
  });
  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <p>Error....</p>;
  }
  return (
    <div>
      <section className="shop">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-heading__title"> Danh mục sản phẩm</h2>
          </div>
          {/* <select
            className="form-select w-25"
            aria-label="Default select example"
          >
            {" "}
            //
          </select>{" "} */}
          <option selected>Tất cả</option>
          {categories?.map((category: { _id?: number; name: string }) => {
            return (
              <div key={category._id}>
                <Link to={`/category/${category._id}`}>
                  <h3>{category.name}</h3>
                </Link>
              </div>
            );
          })}
          {/* </select> */}
        </div>
      </section>
    </div>
  );
};

export default categoryDetailt;
