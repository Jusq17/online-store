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
                />
            </main>
        </div>
    )
}

export default MyProfile