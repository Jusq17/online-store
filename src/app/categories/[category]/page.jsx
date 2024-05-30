import Link from 'next/link'
import Navigation from "../../(components)/Navigation"
import ItemList from "../../(components)/itemList"

const Page = async ({ params }) => {

    return (
        <div>
            <Navigation />
            <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
                <h1 className='text-2xl to-slate-800 pb-2'>{params.category}</h1>
                <div>
                    <ItemList category={params.category} />
                </div>
            </main>
        </div>
    )
}

export default Page