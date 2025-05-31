import React from 'react'
import productsData from '../app/BBDD/PRODUCTS_LIST.json'
import { ImageCard as Card } from '../components'

// Revalidate cada 24 horas (ISR)
export const revalidate = 86400

// Tipos según PRODUCTS_LIST.json
interface ListItem {
  name: string
  route: string
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
  img: string
}

type ProductsData = Record<string, Category>[]

export default function Page() {
  // productsData es importado desde el JSON local en build time
  const dataArray = (productsData as unknown) as ProductsData
  const categoriesMap = dataArray[0]
  const categories = Object.values(categoriesMap)

  return (
    <>
      <main className="flex flex-col items-center justify-center py-20 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-10">Nuestras Categorías</h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          {categories.map((cat, i) => {
            // Número de strings en cat.content
            const count = Array.isArray(cat.content) ? cat.content.length : 0

            return (
              <Card
                key={i}                                 // clave única por categoría
                name={cat.name}                         // nombre de la categoría
                imageSrc={cat.img}                      // imagen de la categoría
                imageLink={cat.route}                   // ajusta la ruta real que quieras
                acceptLink={`/ficha/${cat.route}`}      // ajusta la ruta real que quieras
                cancelLink={`/producto/${cat.route}`}   // ajusta la ruta real que quieras
                counts={count}                          // número de strings en `cat.content`
              />
            );
          })}
        </section>
      </main>
    </>
  )
}