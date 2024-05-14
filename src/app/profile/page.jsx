"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navigation from "../(components)/Navigation"
import Profile from "../(components)/Profile"

const MyProfile = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [myItems, setMyItems] = useState([])
  const [myCart, setMyCart] = useState([])
  console.log(myItems)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()

      console.log(data)

      setMyItems(data.items)
      setMyCart(data.cart)
    }

    if (session?.user.id) {
      fetchItems()
    }
  }, [session?.user.id])

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
      console.log(data)

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
      console.log(data)

      setMyCart(data)

    } catch (error) {
      console.error("Error adding item to cart:", error)
      // Optionally provide feedback to the user
      // alert("Failed to add item to cart. Please try again later.");
    }
  }

  console.log(myCart)

    return (

        <div>
            <Navigation />
            <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
                <Profile
                    name={session?.user.name}
                    desc={session?.user.desc}
                    items={myItems}
                    cart={myCart}
                    handleBuy={handleBuy}
                    removeFromCart={removeFromCart}
                />
            </main>
        </div>
    )
}

export default MyProfile