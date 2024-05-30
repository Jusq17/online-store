"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

const Page = () => {

    const { data: session } = useSession()

    const [categories, setCategories] = useState([])

    useEffect(() => {

        const fetchCategories = async () => {

            const response = await fetch('/api/categories')
            const categories = await response.json()

            console.log(categories)
        }

        fetchCategories()
    }, [])

    return (
      <div className="navbar bg-slate-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href='/selection'>Selection</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl" href='/'>Online-store</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-3">
          <li>
            <details>
              <summary className="text-2xl">Selection</summary>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a href='/selection'>All items</a></li>
                <li><a href='/categories/category1'>Category 1</a></li>
                <li><a href='/categories/category2'>Category 2</a></li>
                {categories.map((category, key) => ( <li key={key}><a href={`/selection/${category}`}>{category}</a></li>))}
              </ul>
            </details>
          </li>
        </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" href='/profile'>Profile</a>
        </div>
      </div>
    )
}

export default Page