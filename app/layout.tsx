import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Luxline",
  description: "Luxline"
}

export default function RootLayout({ children }: { children: ReactNode }) {
return (
  <html lang="es-419">
      {children}
    </html>
// Meta tags globales (SEO, viewport, favicon).
// Sección de cabecera: logo y navegación.
// Contenido de cada página.
// Información de pie de página.

  )
}