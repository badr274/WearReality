import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <Spinner animation="border" role="status" size="sm" className="me-2" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingSpinner;
