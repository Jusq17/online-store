"use client"

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

import ItemCard from '../(components)/ItemCard'

const ItemList = ({ category }) => {

    const router = useRouter()
    const { data: session } = useSession()
    const [items, setItems] = useState([])

    useEffect(() => {

        const fetchItems = async () => {

            console.log(category)

            if (category === 'all') {
                
                const response = await fetch('/api/items')
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

    return (
        <div className="flex flex-row flex-wrap justify-evenly">
            {items.map((item, key) => (
                <ItemCard key={key} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy="not_cart" />
            ))}
        </div>
    )
}

export default ItemList