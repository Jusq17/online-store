"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navigation from "../../(components)/Navigation"
import ItemCard from "../../(components)/ItemCard"

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [myItems, setMyItems] = useState([])

  console.log(myItems)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/users/${session?.user.id}`)
      const data = await response.json()

      setMyItems(data.items)
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

      setMyItems(data.items)

    } catch (error) {
        console.error("Error adding item to cart:", error)
    }
  }

    return (

        <div>
            <Navigation />
            <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
                <h1>Your Items</h1>
                {myItems.map((item, key) => (
                    
                    <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="in_cart" removeFromCart={removeFromCart} />
    
                ))}
            </main>
        </div>
    )
}

export default Page