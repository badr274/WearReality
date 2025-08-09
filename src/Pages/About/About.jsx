export default function About() {
  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div
              className="card shadow-lg border-0 rounded-4 p-5"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="card-body text-center">
                <h1
                  className="mb-4"
                  style={{
                    color: "#651214ff",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    fontStyle: "italic",
                  }}
                >
                  About Us
                </h1>
                <p
                  style={{
                    color: "#4d4d4dff",
                    fontSize: "1.2rem",
                    lineHeight: "1.8",
                  }}
                >
                  Our clothing store solves the problem of not trusting fabric
                  quality online. We provide detailed descriptions, clear
                  images, and honest customer reviews to make your shopping
                  experience more confident and reliable.
                </p>
                <p
                  style={{
                    color: "#666",
                    fontSize: "0.9rem",
                    lineHeight: "1.8",
                  }}
                >
                  Every product is handpicked to meet the highest standards of
                  quality and style. Thank you for choosing us — where fashion
                  meets confidence!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
