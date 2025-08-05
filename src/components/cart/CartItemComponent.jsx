export default function CartItemComponent({cartItem}) {

  return (
  <div className="row align-items-center border-bottom py-3 overflow-auto">
    <div className="col-2">
      <img src={cartItem?.product?.imageCover} className="w-50" alt="item" />
    </div>
    <div className="col-3">
      <h6>{cartItem?.product?.title}</h6>
    </div>
    <div className="col-3">
      <div className="d-flex align-items-center">
        <button className="btn btn-outline-secondary">-</button>
        <span className="mx-2">{cartItem?.quantity}</span>
        <button className="btn btn-outline-secondary">+</button>
      </div>
    </div>
    <div className="col-2 fw-bold">{cartItem?.product?.price}</div>
      <div className="col-2">
        <button className="btn btn-sm btn-link text-danger ps-0">
          <i className="bi bi-trash fs-4"></i>
        </button>
      </div>
    </div>
  );
}
