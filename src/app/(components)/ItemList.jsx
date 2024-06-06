"use client"

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

import Alert from "../(components)/Alert"
import ItemCard from '../(components)/ItemCard'

const ItemList = ({ category }) => {

    const router = useRouter()
    const { data: session } = useSession()
    const [items, setItems] = useState([])
    const [alert, setAlert] = useState([])

    useEffect(() => {

        const fetchItems = async () => {

          console.log(category)

          if (category === 'all') {
              
            const response = await fetch('/api/categories/items')
            const items = await response.json()

            console.log(items)
            console.log(session?.user)

            setItems(items)
          }
          else {

            const response = await fetch(`/api/categories/${category}`)
            const items = await response.json()
            
            console.log(items)
            console.log(session?.user)

            setItems(items)
          }
      }

      fetchItems()

    }, [])

    const addToCart = async (item) => {

      if (!session || !session.user || !session.user.id) {
        console.error("User session information is missing.")
        return
      }
  
      try {
  
        const response = await fetch(`http://localhost:3000/api/users/${session.user.id}/cart`, {
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

        setAlert("Item added to cart!")
        setTimeout(() => {
          setAlert([])
        }, 5000)
  
      } catch (error) {
        console.error("Error adding item to cart:", error)
      }
    }

    return (
      <div className="flex flex-row flex-wrap justify-evenly">
        {items.map((item, key) => (
          <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} addToCart={addToCart} buy="not_cart" />
        ))}

        <Alert message={alert} />
      </div>
    )
}

export default ItemList