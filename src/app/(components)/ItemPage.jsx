"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const ItemPage = ({ name }) => {
    const [item, setItem] = useState([])

    useEffect (() => {
  
      const fetchItem = async () => {
        const response = await fetch(`/api/selection/${name}`)
        const items = await response.json()
        console.log(items)
  
        setItem(items)
      }
  
      fetchItem()
  
    }, [])
  
    return (
      <div className="flex-center flex-col p-4 font-bold text-xl items-center justify-evenly w-full">
          <h1 className="text-blue-700">{item.name}</h1>
          <h4>Price: {item.price}</h4>
          <h4>{item.quantity} left in stock</h4>
          <img src={item.url} alt={item.title} />
      </div>
    )
}

export default ItemPage