

// export default function Home() {
//   return (
//     <div >
//       <main className="h-screen">
//         <Nav />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { promises as fs } from 'fs'
import path from 'path'
import React from 'react'
import Footer from "../components/Footer";
import Nav from "../components/Navbar";

export const revalidate = 86400 // Revalidate every 24 hours

// Tipos para el JSON
interface ListItem {
  name: string
  route: string
  content: Record<string, any> // puede estar vacío u otro nivel
}

interface ListOfType {
  name: string
  route: string
  content: string[]
  list_of_items?: Record<string, ListItem>
}

interface Category {
  name: string
  route: string
  content: string[]
  list_of_types: Record<string, ListOfType>
}

// El JSON es un array con un solo objeto que contiene las categorías
export default async function Page() {
  const filePath = path.join(process.cwd(), 'app/BBDD', 'PRODUCTS_LIST.json')
  const fileContents = await fs.readFile(filePath, 'utf-8')
  const jsonData = JSON.parse(fileContents) as Record<string, Category>[]
  const categoriesMap = jsonData[0]
  const categories = Object.values(categoriesMap)

  return (
    <>
      <Nav />
      <main className="container mx-auto px-4 py-8">

        {categories.map((cat, i) => (
          <section key={i} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{cat.name}</h2>
            {/* Lista de tipos dentro de la categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(cat.list_of_types).map((typeItem, j) => (
                <div key={j} className="border border-gray-200 rounded p-4">
                  <h3 className="text-xl font-medium mb-2">{typeItem.name}</h3>
                  {/* Si hay contenido genérico */}
                  {typeItem.content.length > 0 && (
                    <ul className="list-disc list-inside mb-2">
                      {typeItem.content.map((c, k) => (
                        <li key={k}>{c}</li>
                      ))}
                    </ul>
                  )}
                  {/* Si hay items detallados */}
                  {typeItem.list_of_items && (
                    <ul className="list-decimal list-inside">
                      {Object.values(typeItem.list_of_items).map((item, m) => (
                        <li key={m}>{item.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  )
}
