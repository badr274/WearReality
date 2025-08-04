import React from 'react'
import img from "../cart/img.jpg"

const Cart = () => {
  return (
    <div className=''>
      <div className='100vh d-flex justify-content-center align-items-center flex-column'>

      <img src={img} className='my-5 m-auto' />
      <button className='btn btn-success text-white my-5'>Go Shopping</button>
      </div>
    </div>
  )
}

export default Cart
