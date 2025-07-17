'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between py-2">
          
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-[120px] h-12 md:h-16">
              <Image
                src="/images/luxline-logo.png"
                alt="Luxline Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menú escritorio */}
          <div className="hidden md:flex space-x-4">
            {['productos','nosotros','contacto'].map(path => (
              <Link
                key={path}
                href={`/${path}`}
                className="inline-block min-w-[7rem] text-center text-black px-3 py-2 rounded hover:text-yellow-400 hover:font-bold active:text-cyan-500 transition-all duration-200 ease-in-out"
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              </span>
              {mobileMenuOpen ? (
                <HiOutlineX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Menú desplegable móvil */}
      {mobileMenuOpen && (
       <div className="absolute top-full left-0 w-full bg-white md:hidden z-50">
         <div className="px-2 pt-2 pb-3 space-y-1">
           {['productos','nosotros','contacto'].map(path => (
             <Link
               key={path}
               href={`/${path}`}
               className="block text-black px-3 py-2 rounded hover:text-yellow-400 active:text-cyan-500 transition-all duration-200 ease-in-out"
               onClick={() => setMobileMenuOpen(false)}
             >
               {path.charAt(0).toUpperCase() + path.slice(1)}
             </Link>
           ))}
         </div>
       </div>
     )}
    </nav>
  )
}

export default Navbar
