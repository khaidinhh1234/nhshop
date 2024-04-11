import { New, Services } from "@/components";
import Banner2 from "@/pages/(website)/home/_component/Banner2";
import Category from "@/components/categoryDetailt";
import { useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useProductQuery } from "@/common/hooks/useProductQuery";
import LimitWeb from "@/components/limit";

const ShopPage = () => {
  const [params] = useSearchParams();
  const page = params.get("page");

  const [shouldRefetch, setShouldRefetch] = useState(false); // Biến trạng thái để kiểm soát việc gọi lại API

  const [currentPage, setCurrentPage] = useState(page || 1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, refetch } = useProductQuery({
    _page: page,
    _limit: limit,
  });

  useEffect(() => {
    if (page && +page !== currentPage) {
      setCurrentPage(+page);
      setShouldRefetch(true);
    }
  }, [page, currentPage]);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, currentPage, refetch]);

  const handleLimitChange = (event: ChangeEvent<any>) => {
    setLimit(event.target.value);
    refetch(); // Gọi lại API với limit mới và trang đầu tiên
  };
  const { data: products, pagination } = data || { data: [], pagination: {} };
  if (isLoading) return <div>...Loading</div>;
  return (
    <div>
      <Banner2 />
      <LimitWeb
        handleLimitChange={handleLimitChange}
        limit={limit}
        products={products}
      />

      <Category></Category>
      <New products={products} pagination={pagination} />

      {/* <New></New> */}
      <Services />
    </div>
  );
};

export default ShopPage;
