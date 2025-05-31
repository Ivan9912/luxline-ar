import Link from "next/link"

const Nav = () => {
    return (
        (
            <header className="flex items-center justify-between py-2 h-1/12 bg-white shadow-sm">
                <div className="w-full bg-transparent">
                    <h1 className="text-4xl font-bold text-center">Luxline</h1>
                </div>
                <nav className="flex space-x-6 pr-[32rem]">
                    <Link href="/productos" className="text-blue-600 hover:underline">
                        Productos
                    </Link>
                    <Link href="/contacto" className="text-gray-600 hover:underline">
                        Contacto
                    </Link>
                    <Link target='_blank' href={'https://instagram.com'}
                        rel="noopener noreferrer"
                        className="text-gray-50 underline"
                    >
                        📷
                    </Link>
                </nav>
            </header>
        )
    )
};

export default Nav;