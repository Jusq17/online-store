import Navigation from "../../(components)/Navigation"
import ItemList from "../../(components)/itemList"
import Footer from "../../(components)/Footer"

const Page = async ({ params }) => {

    return (
        <div>
          <Navigation />
          <main className="flex flex-col font-bold text-xl items-center w-full min-h-screen p-5">
            <h1 className='text-2xl to-slate-800 pb-2'>{params.category}</h1>
            <div>
                <ItemList category={params.category} />
            </div>
          </main>
          <Footer />
        </div>
    )
}

export default Page