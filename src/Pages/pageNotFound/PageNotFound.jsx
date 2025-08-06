import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import errrImg from "../../images/error.png"

export default function PageNotFound (){
    const navigate = useNavigate();
    useEffect(() => {
    document.querySelector("nav")?.classList.add("d-none");
    document.querySelector("footer")?.classList.add("d-none");

    return () => {
        document.querySelector("nav")?.classList.remove("d-none");
        document.querySelector("footer")?.classList.remove("d-none");
    };
    }, []);


    return (
        
        <div
            className=" d-flex flex-column justify-content-center align-items-center  vh-100 text-center"
            style={{ backgroundColor: "#fff", color: "#651214ff" }}
            >
            <img
                src={errrImg} 
                alt="404 error"
                style={{ width: "20rem", height: "20rem", objectFit: "contain" }}
            />
            <h5 className="mb-4 fst-italic" style={{color: "#333333ff"}}>
                We Are Sorry, But The Page You Requested Was Not Found
            </h5>

            <div className="d-flex gap-3 mt-2">

                <button  onClick={() => navigate("/")}
                className="btn px-4 py-2 fw-bold"
                style={{
                    color: "#ffffff ",
                    border: "1px solid #ffffff ",
                    borderRadius: "40px",
                    backgroundColor: "#651214ff",
                }}
                >
                Go Home
                </button>

                <button  onClick={() => navigate("/Contact")}
                className="btn not-found-btn px-4 py-2 fw-bold"
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