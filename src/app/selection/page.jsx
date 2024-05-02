import Link from 'next/link'
import Navigation from "../(components)/Navigation"
import ItemList from "../(components)/itemList"
import ItemForm from '../(components)/ItemForm'

const Selection = async () => {

    return (
        <div>
            <Navigation />
            <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
                <h1 className='text-2xl'>All Items</h1>
                <div>
                    <ItemList />
                </div>
            </main>
        </div>
    )
}

export default Selection