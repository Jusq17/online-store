import Navigation from "./(components)/Navigation"

const Index = () => {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col font-bold text-xl items-center justify-evenly w-full p-5">
        <h1>Online store</h1>
        <p>Welcome!</p>
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        </div>
      </main>
    </div>
  )
}

export default Index
