import React from 'react'

const ItemCard = ({ name, price, addToCart }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-5">
        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{price} €</p>
            <div className="card-actions justify-end">
            <button onClick={addToCart} className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default ItemCard