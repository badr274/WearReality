import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container p-4 my-5">
      <div className="row gx-4 gy-5">
        <div className="col-12 col-lg-4 text-center">
          <Skeleton height={300} width={"100%"} />
        </div>

        <div className="col-12 col-lg-8 d-flex flex-column">
          <Skeleton height={32} width={"60%"} style={{ marginBottom: 12 }} />
          <Skeleton count={3} width={"100%"} style={{ marginBottom: 12 }} />
          <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-2 my-3">
            <Skeleton height={20} width={"30%"} />
            <Skeleton height={20} width={"30%"} />
          </div>
          <Skeleton height={20} width={"40%"} style={{ marginBottom: 20 }} />

          <div className="row gap-3 my-5 w-100">
            <Skeleton height={40} className="col-12 col-sm-5" />
            <Skeleton height={40} className="col-12 col-sm-5" />
          </div>

          <Skeleton height={25} width={150} style={{ marginBottom: 15 }} />
          <div className="d-flex gap-3 w-100 mt-3">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                height={250}
                width={"100%"}
                style={{
                  borderRadius: "0.375rem",
                  boxShadow: "0 2px 6px rgb(0 0 0 / 0.1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
