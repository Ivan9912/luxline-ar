import React from "react"
import Image from "next/image"
import Link from "next/link"
import productsData from '../app/BBDD/PRODUCTS_LIST.json'
import { ImageCard as Card, Footer as Footer, ImageCard, Nav as Nav } from '../components'

export const revalidate = 86400 // Revalidate every 24 hours

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
      <body className="font-sans">
        <Nav />
        <main className="bg-gray-100 flex items-center justify-center py-20 min-h-screen">
          <section className="grid grid-cols-3 gap-16">
            {categories.map((cat, i) => {

              // 1. Tomamos la longitud del array `content (es decir, cuántos strings hay en esa categoría).

              const count = Array.isArray(cat.content) ? cat.content.length : 0;

              // 2. Devolvemos UN SOLO ImageCard por cada categoría usando `count` para mostrar cuántos items hay.

              return (
                <ImageCard
                  key={i}                  // clave única por categoría
                  name={cat.name}          // nombre de la categoría
                  imageSrc={cat.img}       // imagen de la categoría
                  imageLink="/"            // ajusta la ruta real que quieras
                  acceptLink="/"           // ajusta la ruta real que quieras
                  cancelLink={cat.route}   // ajusta la ruta real que quieras
                  counts={count}           // número de strings en `cat.content`
                />
              );
            })}
          </section>
        </main>
        <Footer />
      </body >
    </>
  )
}
