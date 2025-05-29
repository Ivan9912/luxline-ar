import "./globals.css"
import { ReactNode } from "react"

export const metadata = {
  title: "Luxline",
  description: "Luxline"
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-419">
      <body className="bg-white text-gray-800 font-sans">{children}</body>
    </html>
  )
}
