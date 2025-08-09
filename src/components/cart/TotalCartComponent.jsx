import { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router';

const TotalCartComponent = () => {
const navigate = useNavigate()
    const { cartItems , setCartItems } = useContext(CartContext);

      const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );
  return (
    
      <div className="w-100">
              <div
                className="card p-4 shadow-sm"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                <h5 style={{ color: "#651214ff"}} className="mb-3 fw-bold">Summary</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span style={{color:"rgba(60, 62, 65, 1)"}} className='fw-bold'>Total:</span>
                  <strong className="text-success">
                    {totalPrice.toFixed(2)} EGP
                  </strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{color:"rgba(60, 62, 65, 1)"}} className='fw-bold'>Total Items:</span>
                  <strong className="text-success">
                    {cartItems.length}
                  </strong>
                </div>

                <div className="mt-4 d-grid gap-2">
                  <button style={{backgroundColor:"rgb(101, 18, 20)",color:"#efefefff" ,borderRadius:"25px"}} className="btn" onClick={()=>navigate("/payment")}>Checkout</button>
                  <button style={{backgroundColor:"rgb(89, 92, 95)" ,color:"#efefefff",borderRadius:"25px" }} className="btn " onClick={()=>setCartItems([])} >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
    
  )
}

export default TotalCartComponent
