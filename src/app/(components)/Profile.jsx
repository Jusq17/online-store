import { useSession } from "next-auth/react"

import Link from 'next/link'
import ItemCard from './ItemCard'

const Profile = ({ name, desc, items, cart, removeFromCart, handleBuy }) => {

  const { data: session } = useSession()

  const cartTotal = (cart.map(item => item.price)).reduce((a, b) => a + b, 0)

  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-1/2 p-5">
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
              <h1 className="text-2xl">Your Cart:</h1>
              <div className='mb-8'>
                <div className='flex flex-row flex-wrap justify-evenly'>
                  {cart.map((item, key) => (
                    
                    <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="in_cart" removeFromCart={removeFromCart} />

                  ))}
                </div>

                {cart.length === 0 
                ?
                  <h1>No items in cart</h1>
                :
                  <div>
                    <h3>Total: ${cartTotal}</h3>
                    <button className="btn btn-primary mb-2" onClick={() => handleBuy(cart)}>Buy cart</button>
                  </div>
                }
              </div>
              
              <h1 className="text-2xl">Your Items:</h1>
              <div className='flex flex-row flex-wrap justify-evenly'>
                {items.map((item, key) => (

                  <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} />

                ))}
              </div>
            </div>
          : 
            <h1>Loading...</h1>
        }
      </div>
    </main> 
  );
};

export default Profile
