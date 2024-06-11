import Navigation from "../(components)/Navigation"
import ItemList from "../(components)/ItemList"
import Footer from "../(components)/Footer"

const Selection = async () => {

    return (
        <div>
          <Navigation />
          <main className="flex flex-col font-bold text-xl items-center w-full min-h-screen p-5">
            <h1 className='text-2xl to-slate-800'>All Items</h1>
            <div>
              <ItemList category="all"/>
            </div>
          </main>
          <Footer />
        </div>
    )
}

export default Selection