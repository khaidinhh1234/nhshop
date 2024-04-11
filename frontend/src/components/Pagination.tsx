import React from "react";
import { Link, useSearchParams } from "react-router-dom";

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [params] = useSearchParams();
  const page = params.get("page");
  return (
    <div className="container mt-5">
      <nav className="pagination-menu ">
        <ul className="pagination-list">
          {Array.from({ length: totalPages }, (_, i) => (
            <li className="pagination-item" key={i + 1}>
              <Link
                to={`?page=${i + 1}`}
                className={
                  parseInt(page || "1") === i + 1
                    ? "pagination-link_next2"
                    : "pagination-link_next"
                }
              >
                {i + 1}
              </Link>{" "}
            </li>
          ))}
        </ul>
      </nav>

      {/*end pagination*/}
    </div>
  );
};

export default Pagination;
