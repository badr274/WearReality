import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import errrImg from "../../images/error.png";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-white">
      <img
        src={errrImg}
        alt="404 error"
        className="img-fluid"
        style={{ maxWidth: "300px" }}
      />

      <h5 className="mb-4 fst-italic text-secondary">
        We Are Sorry, But The Page You Requested Was Not Found
      </h5>

      <div className="d-flex flex-column flex-sm-row gap-3 mt-2">
        <button
          onClick={() => navigate("/")}
          className="btn fw-bold text-white px-4 py-2"
          style={{
            backgroundColor: "#651214ff",
            borderRadius: "40px",
          }}
        >
          Go Home
        </button>

        <button
          onClick={() => navigate("/Contact")}
          className="btn not-found-btn fw-bold px-4 py-2"
          style={{
            color: "#651214ff",
            border: "1px solid #a4a4a49d",
            borderRadius: "40px",
            backgroundColor: "transparent",
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
