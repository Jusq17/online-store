"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react"

const Page = () => {

    const { data: session } = useSession()

    return (
      <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Selection</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl" href='/'>Online-store</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <a className="btn btn-ghost text-xl" href='/selection'>Selection</a>
      </div>
      <div className="navbar-end">
        <a className="btn" href='/profile'>Profile</a>
      </div>
    </div>
    )
}

export default Page