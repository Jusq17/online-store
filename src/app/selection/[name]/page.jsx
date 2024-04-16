import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navigation from "../../(components)/navigation"
import ItemPage from '../../(components)/ItemPage'

const Page = async ({ params }) => {

  return (
    <div>
      <Navigation />
      <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
        <div>
          <ItemPage name={params.name}/>
        </div>
      </main>
    </div>
  )
}

export default Page