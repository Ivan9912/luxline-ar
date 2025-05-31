import React from "react"
import Image from "next/image"
import Link from "next/link"
import productsData from '../app/BBDD/PRODUCTS_LIST.json'
import { ImageCard as Card, Footer as Footer, Nav as Nav } from '../components'

export const revalidate = 86400 // Revalidate every 24 hours

// Tipos según PRODUCTS_LIST.json
interface ListItem {
  name: string
  route: string
  img?: string
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
        <main className=" bg-gray-100 flex items-center justify-center py-20 h-auto">
          <section className="grid grid-cols-3 gap-16">
            {
              categories.map((cat, i) => {
                const types = Object.values(cat.list_of_types)
                return (<Card acceptLink={'/'} counts={types} name={cat.name} imageLink={'/'} key={`${i}-Cards`} cancelLink={'/'} imageSrc="bulbos.png" />)
              })
            } 
          </section>
        </main >
        <Footer />
      </body >
    </>
  )
}
