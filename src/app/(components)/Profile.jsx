import { useSession } from "next-auth/react"

import Link from 'next/link'
import ItemCard from './ItemCard'

const Profile = ({ name, desc, items, cart, handleEdit, handleDelete }) => {

  const { data: session } = useSession()

  const handleBuy = async (item) => {

    if (!session || !session.user || !session.user.id) {
      console.error("User session information is missing.")
      return
    }

    try {
      const response = await fetch(`api/users/${session.user.id}/buy`, {
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
      console.log(data) // Log response data if needed

      // Optionally provide feedback to the user
      // alert("Item added to cart successfully!");
    } catch (error) {
        console.error("Error adding item to cart:", error)
        // Optionally provide feedback to the user
        // alert("Failed to add item to cart. Please try again later.");
    }
  }

  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
      <h1 className='head_text text-left'>{name} Profile</h1>

      <div className='mt-10 prompt_layout'>
        {items && items.length === 0 && cart && cart.length === 0 && (
          <div className='flex-center flex-col'>
            <h1 className='text-center'>No items found</h1>
            <Link href='/add' className='text-blue-500 hover:text-blue-800'>
              Add an item
            </Link>
          </div>
        )}
        {items != undefined && cart != undefined
          ?
            <div>
              <h1>Your Cart:</h1>
              {cart.map((item) => (
                
                <ItemCard key={item.name} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy={true} />

              ))}
              <button className="btn btn-primary mb-2" onClick={() => handleBuy(cart)}>Buy cart</button>
              
              <h1>Your Items:</h1>
              {items.map((item) => (
                
                <ItemCard key={item.name} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} />

              ))}
            </div>
          : 
            <h1>Loading...</h1>
        }
      </div>
    </main> 
  );
};

export default Profile
