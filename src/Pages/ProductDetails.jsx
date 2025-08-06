import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="container d-flex justify-content-center align-items-center p-4 my-5">
      {product ? (
        <div className=" d-flex justify-content-between align-items-center flex-column flex-lg-row w-100 gap-4">
          <div className="">
            <img
              src={product?.imageCover}
              className=" img-fluid "
              width="300px"
            />
          </div>
          <div className="d-flex justify-content-start align-items-start flex-column w-75">
            <h2>{product?.title}</h2>
            <p className="text-secondary ">{product?.description}</p>
            <p>
              <span className="fw-bold ">Category:</span>{" "}
              {product?.category?.name}
            </p>
            <div className="d-flex justify-content-between align-items-center w-100">
              <p>
                <span className="fw-bold">Price:</span> ${product?.price}
              </p>
              <p>
                <span className="fw-bold">Rating:</span>{" "}
                {product?.ratingsAverage} ({product?.ratingsQuantity} reviews)
              </p>
            </div>
            <button
              style={{ background: "var(--main-color)" }}
              className="btn w-100 text-white"
              onClick={() => setCartItems((prev) => [...prev, product])}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
