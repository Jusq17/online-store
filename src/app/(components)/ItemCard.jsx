
const ItemCard = ({ item, name, price, desc, imgUrl, buy, addToCart, removeFromCart }) => {

  return (
    <div className="card w-96 bg-slate-100 shadow-xl m-5">
        <figure><img src={imgUrl} alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{price} €</p>
            <p>{desc}</p>
            <div className="card-actions justify-end">
              { buy == "not_cart" && ( <button onClick={() => addToCart(item)} className="btn btn-primary mt-2">Add to cart</button> )}
              { buy == "in_cart" && ( <button onClick={() => removeFromCart(item)} className="btn btn-primary mt-2">Remove</button> )}
            </div>
        </div>
    </div>
  )
}

export default ItemCard