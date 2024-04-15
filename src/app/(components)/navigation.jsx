import Link from 'next/link'

const page = () => {
    return (
        <nav className="flex flex-row font-bold text-xl justify-evenly">
            <Link href="/">Home</Link>
            <Link href="/selection">Selection</Link>
        </nav>
    )
}

export default page