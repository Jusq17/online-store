"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

const ItemList = () => {

    const [items, setItems] = useState([])

    useEffect(() => {

        const fetchItems = async () => {
            const response = await fetch('/api/items')
            const items = await response.json()
            console.log(items)

            setItems(items)
        }

        fetchItems()
    }, [])

    return (
        <div>
            {items.map((item, index) => (
                <div className="flex-center flex-col p-4 font-bold text-xl items-center justify-evenly w-full" key={item.id}>
                    <h1 className="text-blue-700">{item.name}</h1>
                        <h4>Price: {item.price}</h4>
                        <h4>{item.quantity} left in stock</h4>
                        <img src={item.url} alt={item.title} />
                        <Link href={{ pathname: `/selection/${item.name}` }} className="text-blue-500 hover:text-blue-800">
                            Go to item
                        </Link>
                        <div className="flex flex-col flex-auto">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to cart</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to wishlist</button>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default ItemList