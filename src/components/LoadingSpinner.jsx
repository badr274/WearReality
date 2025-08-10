import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-1">
      <Spinner animation="border" role="status" size="sm" />
      <span>{message}</span>
    </div>
  );
};

export default LoadingSpinner;
