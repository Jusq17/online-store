"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Navigation from "../../(components)/Navigation"
import ItemCard from "../../(components)/ItemCard"
import Footer from "../../(components)/Footer"

const Page = () => {

  const { data: session } = useSession()

  const [myItems, setMyItems] = useState([])

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

    return (

        <div>
          <Navigation />
          <main className="flex flex-col font-bold text-xl items-center w-full min-h-screen p-5">
            <h1 className='text-2xl to-slate-800'>Your Items</h1>
            <div>
              <div className="flex flex-row flex-wrap justify-evenly">
                {myItems.map((item, key) => (
                    
                  <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} />

                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
    )
}

export default Page