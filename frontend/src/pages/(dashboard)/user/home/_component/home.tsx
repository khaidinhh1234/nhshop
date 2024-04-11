import { useProductQuery } from "@/common/hooks/useProductQuery";
import { IProduct } from "@/common/types/product";
import { Banner, Blog, New, Services, Shop } from "@/components";

const HomePage1 = () => {
  const { data } = useProductQuery({ _limit: 8 });
  console.log(data);
  const featuredProducts = data?.data.filter(
    (product: IProduct) => product.featured === true
  );
  return (
    <div>
      <Banner />
      <div className="container">
        <div className="section-heading">
          <h2 className="section-heading__title">New</h2>
        </div>
      </div>
      <New products={featuredProducts} />
      {/* <New featured={true} /> */}

      <div className="container">
        <hr />
      </div>
      <Shop />
      <Blog />
      <Services />
    </div>
  );
};

export default HomePage1;
