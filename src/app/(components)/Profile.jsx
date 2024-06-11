import { useSession } from "next-auth/react"

import ItemCard from './ItemCard'
import Footer from './Footer'

const Profile = ({ name, desc, items, cart, balance, removeFromCart, handleBuy }) => {

  const { data: session } = useSession()

  const cartTotal = (cart.map(item => item.price)).reduce((a, b) => a + b, 0)

  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-1/2 p-5">

      { !session 
        ? <h1 className='text-center'>Please sign in to view your profile</h1>
        :
        <div>
          <h1 className='text-center text-2xl'>{name} Profile</h1>
          <h2 className='text-center'>Account balance: {balance}€</h2>
          <div className='mt-10'>

            {items != undefined && cart != undefined
              ?
                <div>
                  <h1 className="text-2xl">Your Cart:</h1>
                  <div className='mb-8'>
                    {cart.map((item, key) => (
                      
                      <div key={key} className='flex flex-row flex-wrap justify-evenly'>
                        <ItemCard item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="in_cart" removeFromCart={removeFromCart} />
                      </div>

                    ))}
                  </div>
  
                    {cart.length === 0 
                    ?
                      <h1 className='text-center mb-8'>No items in cart</h1>
                    :
                      <div>
                        <h3>Total: ${cartTotal}</h3>
                        <button className="btn btn-primary mb-2" onClick={() => handleBuy(cart)}>Buy cart</button>
                      </div>
                    }
                  
                  <h1 className="text-2xl">Your Items:</h1>
                  <div className='mt-8'>
                    { items.length === 0 
                      ?
                        <h1 className='text-center'>No items owned</h1>
                      :
                        items.map((item, key) => (

                          <div key={key} className='flex flex-row flex-wrap justify-evenly'>
                            <ItemCard item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} />
                          </div>
        
                        ))
                    }
                  </div>
                </div>
              : 
                <h1>Loading...</h1>
            }
          </div>
        </div>
      }
    </main> 
  )
}

export default Profile
