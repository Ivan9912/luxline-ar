'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi' // Iconos para “hamburguesa” y “X”

const Navbar: FC = () => {
  // 1. Creamos un estado para saber si el menú móvil está abierto (true) o cerrado (false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 2. Función para alternar ese estado
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-sm transition-colors duration-300 hover:bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          
          {/* -----------------------------------------------------------
              1. Branding “LUXLINE” con animación y tamaño text-3xl
          ----------------------------------------------------------- */}
          <Link href="/" className="group flex items-center">
            <span
              className={`
                text-3xl
                bg-gradient-to-tr from-yellow-400 via-yellow-300 to-white
                bg-clip-text text-transparent
                font-extrabold uppercase tracking-wider
                transition-all duration-500 ease-in-out
                group-hover:bg-none
                group-hover:text-cyan-500
              `}
            >
              LUX
            </span>
            <span
              className={`
                text-3xl
                text-cyan-500
                font-extrabold uppercase tracking-wider
                transition-all duration-500 ease-in-out
                group-hover:bg-gradient-to-tr
                group-hover:from-yellow-400
                group-hover:via-yellow-300
                group-hover:to-white
                group-hover:bg-clip-text
                group-hover:text-transparent
              `}
            >
              LINE
            </span>
          </Link>

          {/* -----------------------------------------------------------
              2. Menú de navegación (escritorio)
          ----------------------------------------------------------- */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/productos"
              className="
                inline-block min-w-[7rem] text-center
                bg-transparent text-black px-3 py-2 rounded
                hover:text-yellow-400 hover:font-bold
                active:text-cyan-500
                transition-all duration-200 ease-in-out
              "
            >
              Productos
            </Link>
            <Link
              href="/nosotros"
              className="
                inline-block min-w-[7rem] text-center
                bg-transparent text-black px-3 py-2 rounded
                hover:text-yellow-400 hover:font-bold
                active:text-cyan-500
                transition-all duration-200 ease-in-out
              "
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="
                inline-block min-w-[7rem] text-center
                bg-transparent text-black px-3 py-2 rounded
                hover:text-yellow-400 hover:font-bold
                active:text-cyan-500
                transition-all duration-200 ease-in-out
              "
            >
              Contacto
            </Link>
          </div>

          {/* -----------------------------------------------------------
              3. Botón hamburguesa (móvil)
          ----------------------------------------------------------- */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              className="
                inline-flex items-center justify-center
                p-2 rounded-md text-gray-800 hover:text-gray-900
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              <span className="sr-only">
                {mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              </span>
              {mobileMenuOpen ? (
                <HiOutlineX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------
          4. Menú móvil (desplegable según estado)
      ----------------------------------------------------------- */}
      {/* 
        - Si mobileMenuOpen es false, aplicamos “hidden” (no se ve). 
        - Si es true, “block” para verlo.
      */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/productos"
            className="
              block bg-transparent text-black px-3 py-2 rounded
              hover:text-yellow-400 active:text-cyan-500
              transition-all duration-200 ease-in-out
            "
            onClick={() => setMobileMenuOpen(false)} // cierra al hacer click en un enlace
          >
            Productos
          </Link>
          <Link
            href="/nosotros"
            className="
              block bg-transparent text-black px-3 py-2 rounded
              hover:text-yellow-400 active:text-cyan-500
              transition-all duration-200 ease-in-out
            "
            onClick={() => setMobileMenuOpen(false)}
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className="
              block bg-transparent text-black px-3 py-2 rounded
              hover:text-yellow-400 active:text-cyan-500
              transition-all duration-200 ease-in-out
            "
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
