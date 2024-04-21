import { useSession } from "next-auth/react"

const ItemCard = ({ item, name, price }) => {

  const { data: session } = useSession()

  const addToCart = async (item) => {

    console.log(session?.user)

    const response = await fetch(`/users/${session?.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    console.log(data)

}

  return (
    <div className="card w-96 bg-base-100 shadow-xl m-5">
        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <p>{price} €</p>
            <div className="card-actions justify-end">
            <button onClick={() => addToCart(item)} className="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default ItemCard