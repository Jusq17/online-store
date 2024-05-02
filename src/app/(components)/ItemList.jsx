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

    return (
        <div>
            {items.map((item, index) => (
                <ItemCard key={index} item={item} name={item.name} price={item.price} desc={item.description} imgUrl={item.url} buy={true}/>
            ))}
        </div>
    )
}

export default ItemList