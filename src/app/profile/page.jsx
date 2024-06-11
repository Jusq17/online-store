"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navigation from "../(components)/Navigation"
import Profile from "../(components)/Profile"
import Footer from "../(components)/Footer"

const MyProfile = () => {

  const router = useRouter()
  const { data: session } = useSession()

  const [myItems, setMyItems] = useState([])
  const [myCart, setMyCart] = useState([])
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()

      setMyItems(data.items)
      setMyCart(data.cart)
      setBalance(data.balance)
    }

    if (session?.user.id) {
      fetchItems()
    }
  }, [session?.user.id])

  const handleBuy = async (cartItems) => {

    if (!session || !session.user || !session.user.id) {
      console.error("User session information is missing.")
      return
    }

    try {
      const response = await fetch(`api/users/${session.user.id}/buy`, {
          method: 'PATCH',
          body: JSON.stringify(cartItems),
          headers: {
              'Content-Type': 'application/json'
          }
      })

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`)
      }

      const data = await response.json()

      setMyCart([])
      setMyItems(data.items)

    } catch (error) {
        console.error("Error adding item to cart:", error)
    }
  }

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
          <main className="flex flex-col font-bold text-xl items-center w-full min-h-screen p-5">
            <Profile
              name={session?.user.name}
              items={myItems}
              cart={myCart}
              balance={balance}
              handleBuy={handleBuy}
              removeFromCart={removeFromCart}
            />
          </main>
          <Footer />
        </div>
    )
}

export default MyProfile