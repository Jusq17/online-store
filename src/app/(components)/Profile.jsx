import { useSession } from "next-auth/react"

import Link from 'next/link'
import ItemCard from './ItemCard'

const Profile = ({ name, desc, items, cart, removeFromCart, handleBuy }) => {

  const { data: session } = useSession()

  const cartTotal = (cart.map(item => item.price)).reduce((a, b) => a + b, 0)

  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
      <h1 className='head_text text-left text-2xl'>{name} Profile</h1>

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
              {cart.map((item, key) => (
                
                <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="in_cart" removeFromCart={removeFromCart} />

              ))}
              
              <h3>Total: ${cartTotal}</h3>
              <button className="btn btn-primary mb-2" onClick={() => handleBuy(cart)}>Buy cart</button>
              
              <h1>Your Items:</h1>
              {items.map((item, key) => (
                
                <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} />

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
