"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navigation from "../../(components)/Navigation"
import ItemCard from "../../(components)/ItemCard"

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [myCart, setMyCart] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()

      setMyCart(data.cart)
    }

    if (session?.user.id) {
      fetchItems()
    }
  }, [session?.user.id])

  const removeFromCart = async (item) => {

    if (!session || !session.user || !session.user.id) {
      console.error("User session information is missing.")
      return
    }

    try {

      const response = await fetch(`api/users/${session.user.id}/remove`, {
          method: 'PATCH',
          body: JSON.stringify(item),
          headers: {
              'Content-Type': 'application/json'
          }
      })

      if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`)
      }

      const cart = myCart

      console.log("cart at the beginning", cart)
      
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === item.name) {
            cart.splice(i, 1)
            console.log("removed item from cart")
            break
        }
      }

      console.log("cart at the end", cart)

      const data = await response.json()

      setMyCart(data)

    } catch (error) {
      console.error("Error adding item to cart:", error)
    }
  }

    return (

        <div>
          <Navigation />
          <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
            <h1>Your Cart</h1>
            <div className="flex flex-col items-center justify-evenly w-full p-5">
              {myCart.map((item, key) => (
                    
                <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="in_cart" removeFromCart={removeFromCart} />

              ))}
            </div>
          </main>
        </div>
    )
}

export default Page