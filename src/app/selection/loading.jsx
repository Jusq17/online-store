"use client"

import LoadingSpinner from '../(components)/LoadingSpinner'

const loading = () => {
  return (
    <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
      <LoadingSpinner />
    </main>
  )
}

export default loading