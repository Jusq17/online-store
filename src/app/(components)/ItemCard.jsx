import { useSession } from "next-auth/react"

const ItemCard = ({ item, name, price, desc, imgUrl, buy, removeFromCart }) => {

  const { data: session } = useSession()

  const addToCart = async (item) => {

    if (!session || !session.user || !session.user.id) {
      console.error("User session information is missing.")
      return
    }

    try {

      const response = await fetch(`api/users/${session.user.id}/cart`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`)
      }

      const data = await response.json()

    } catch (error) {
      console.error("Error adding item to cart:", error)
      // Optionally provide feedback to the user
      // alert("Failed to add item to cart. Please try again later.");
    }
  }

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