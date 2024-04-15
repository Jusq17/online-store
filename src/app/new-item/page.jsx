"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ItemForm from '../(components)/ItemForm'

const Page = () => {
  const router = useRouter()

  const [submitting, setIsSubmitting] = useState(false)
  const [item, setItem] = useState({ name: "", price: "", quantity: "", url: "" })

  const createPrompt = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/items/new", {
        method: "POST",
        body: JSON.stringify({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            url: item.url
        }),
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
      <h1>Create a new item</h1>
      <ItemForm 
        item={item}
        setItem={setItem}
        handleSubmit={createPrompt}
        submitting={submitting}
      />
    </div>
  )
}

export default Page