import Link from 'next/link'
import Navigation from "../(components)/navigation"
import ItemList from "../(components)/itemList"
import ItemForm from '../(components)/ItemForm'

const page = async () => {

    return (
        <div>
            <Navigation />
            <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
                <h1>Selection</h1>
                <h2>Select here</h2>
                <div>
                    <ItemList />
                </div>
            </main>
        </div>
    )
}

export default page