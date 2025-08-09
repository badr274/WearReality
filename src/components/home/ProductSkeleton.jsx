const ProductSkeleton = ({ showContent = false, showBtns = false }) => {
  const skeletonBg = { backgroundColor: "#d6d6d6" }; // درجة أغمق من bg-light

  return (
    <div
      className={`card rounded  shadow-sm border-0`}
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: 0,
        overflow: "hidden",
        backgroundColor: showContent ? "white" : skeletonBg,
      }}
    >
      <div
        style={{ ...skeletonBg, width: "100%", height: "200px" }}
        className="rounded-0"
      ></div>

      {showContent && (
        <>
          <div
            style={{ ...skeletonBg, width: "70%", height: "20px" }}
            className="rounded mb-2 mx-3 mt-3"
          ></div>
          <div
            style={{ ...skeletonBg, width: "93%", height: "14px" }}
            className="rounded mb-1 mx-3"
          ></div>
          <div
            style={{ ...skeletonBg, width: "90%", height: "14px" }}
            className="rounded mb-3 mx-3"
          ></div>
          <div className="d-flex gap-3 mb-3 mx-3">
            <div
              style={{ ...skeletonBg, width: "80px", height: "16px" }}
              className="rounded"
            ></div>
            <div
              style={{ ...skeletonBg, width: "60px", height: "16px" }}
              className="rounded"
            ></div>
          </div>
          {showBtns && (
            <div className="d-flex gap-2 mx-3 mb-3">
              <div
                style={{ ...skeletonBg, height: "36px" }}
                className="rounded flex-grow-1"
              ></div>
              <div
                style={{ ...skeletonBg, height: "36px" }}
                className="rounded flex-grow-1"
              ></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductSkeleton;
