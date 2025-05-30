import React from "react"
import Image from "next/image"
import Link from "next/link"
import productsData from '../app/BBDD/PRODUCTS_LIST.json'
import { ImageCard as Card, Footer as Footer, Nav as Nav} from '../components'

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
}

type ProductsData = Record<string, Category>[]

export default function Page() {
  // productsData es importado desde el JSON local en build time
  const dataArray = (productsData as unknown) as ProductsData
  const categoriesMap = dataArray[0]
  const categories = Object.values(categoriesMap)

  return (
    <div>
      <Nav />
      <body className="font-sans">
        <main className=" bg-gray-100">
          <section className="text-center w-64 grid grid-cols-3 px-12">
            <Card acceptLink={'/'} imageLink={'/'} key={`1`} cancelLink={'/'} imageSrc="bulbos.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`2`} cancelLink={'/'} imageSrc="bulbos.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`3`} cancelLink={'/'} imageSrc="bulbos.png" />
          </section>
        </main>
      </body>
      <Footer />
    </div>
  )
}
