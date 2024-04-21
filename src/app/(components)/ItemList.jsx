"use client"

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

import ItemCard from '../(components)/ItemCard'

const ItemList = () => {

    const router = useRouter()
    const { data: session } = useSession()
    const [items, setItems] = useState([])

    useEffect(() => {

        const fetchItems = async () => {

            const response = await fetch('/api/items')
            const items = await response.json()
            console.log(items)
            console.log(session?.user)

            setItems(items)
        }

        fetchItems()

    }, [])

    const addToCart = async (item) => {

        console.log(session?.user)

        const response = await fetch(`/users/${session?.user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
    
    }

    return (
        <div>
            {items.map((item, index) => (
                <ItemCard key={index} item={item} name={item.name} price={item.price} addToCart={addToCart} />
            ))}
        </div>
    )
}

export default ItemList