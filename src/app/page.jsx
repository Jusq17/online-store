"use client"

import Navigation from "./(components)/Navigation"
import Footer from "./(components)/Footer"
import ItemCard from "./(components)/ItemCard"
import { useState, useEffect } from "react"

const Index = () => {

  const [firstItem, setFirstItem] = useState()

  useEffect(() => {

    const getFirstItem = async () => {

      const response = await fetch('/api/items')
      const items = await response.json()

      setFirstItem(items[0])
    }

    getFirstItem()

  }, [])

  return (
    <div>
      <Navigation />
      <main className="flex flex-col font-bold text-xl items-center w-full min-h-screen p-5">
        <h1 className="text-2xl">Welcome!</h1>
        <h2 className="text-xl my-2">Check out this item:</h2>
        <div>
          {firstItem && <ItemCard item={firstItem} name={firstItem.name} price={firstItem.price} desc={firstItem.description} imgUrl={firstItem.url} />}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Index
