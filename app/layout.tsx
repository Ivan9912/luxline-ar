import { Footer, WhatsAppFloatingButton, Nav as Navbar } from '../components'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-419" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="h-full overflow-y-auto font-sans bg-gray-100">
        {/* Navbar sticky al top */}
        <header className="sticky top-0 w-full z-50 bg-transparent backdrop-blur-md hover:bg-white transition-colors duration-700 overscroll-none">
          <Navbar />
        </header>

        {/* Contenido principal con padding para navbar y footer */}
        <main className="pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* Botón de WhatsApp fijo sobre todo */}
        <WhatsAppFloatingButton
          phoneNumber="5491123188568"
          message="Hola Luxline. Quiero..."
        />
      </body>
    </html>
  )
}
