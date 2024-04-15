import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Navigation from "../../(components)/navigation"
import ItemPage from '../../(components)/ItemPage'

const Page = async ({ params }) => {

  return (
    <div>
      <Navigation />
      <div className="flex-center flex-col p-4 font-bold text-xl items-center justify-evenly w-full">
          <ItemPage name={params.name}/>
      </div>
    </div>
  )
}

export default Page