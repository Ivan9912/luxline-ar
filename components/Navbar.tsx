import Link from "next/link"

const Nav = () => {
    return (
        (
            <header className="flex items-center justify-between px-8 py-4 h-1/12 bg-white shadow-sm">
                <div className="w-full bg-transparent">
                    <h1 className="text-4xl font-bold text-center mb-8">Luxline</h1>
                </div>
                <nav className="flex space-x-6">
                    <Link href="/productos" className="text-blue-600 hover:underline">
                        Productos
                    </Link>
                    <Link href="/contacto" className="text-gray-400 hover:underline">
                        Contacto
                    </Link>
                    <Link target='_blank' href={'https://instagram.com'}
                        rel="noopener noreferrer"
                        className="text-gray-400"
                    >
                        📷
                    </Link>
                </nav>
            </header>
        )
    )
};

export default Nav;