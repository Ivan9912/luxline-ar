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
    <>
    <body className="font-sans">
      <Nav />
        <main className=" bg-gray-100 flex items-center justify-center h-screen pt-[40rem]">
          <section className="grid grid-cols-3 gap-16">
            <Card acceptLink={'/'} imageLink={'/'} key={`1`} cancelLink={'/'} imageSrc="bulbos.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`2`} cancelLink={'/'} imageSrc="bulbones.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`3`} cancelLink={'/'} imageSrc="ar111.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`4`} cancelLink={'/'} imageSrc="dicroicas.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`5`} cancelLink={'/'} imageSrc="filamento.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`6`} cancelLink={'/'} imageSrc="par-led.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`7`} cancelLink={'/'} imageSrc="smart.png" />
            <Card acceptLink={'/'} imageLink={'/'} key={`8`} cancelLink={'/'} imageSrc="tubos.png" />
          </section>
        </main >
        {categories.map((cat, i) => {
          const types = Object.values(cat.list_of_types)
          return (
            <section key={`${i} + A`} className="px-8 pb-16">
              <h2 className="text-3xl font-semibold text-center text-gray-700 mb-8">
                {cat.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {types.map((typeItem, i) => {
                  const count = typeItem.list_of_items
                    ? Object.keys(typeItem.list_of_items).length
                    : typeItem.content.length
                  return (
                    <Link
                      key={`${typeItem.route}+ ${i}`}
                      href={`/`} //href={`/${cat.route}/${typeItem.route}`}
                      className="relative group block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                      {/* Placeholder image: reemplaza src por ruta real */}
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <Image
                          src={`/images/${cat.route}/${typeItem.route}.png`}
                          alt={typeItem.name}
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="py-4 text-center">
                        <h3 className="text-xl font-medium text-gray-600">
                          {typeItem.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{count} Productos</p>
                      </div>

                      {/* Overlay hover */}
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <h3 className="text-2xl font-semibold text-white mb-2">
                          {typeItem.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-4">{count} Productos</p>
                        <div className="flex space-x-4">
                          <Link
                            href={`/${cat.route}/${typeItem.route}/ficha`}
                            className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition"
                          >
                            Ficha Técnica
                          </Link>
                          <Link
                            href={`/${cat.route}/${typeItem.route}`}
                            className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
                          >
                            Ver Productos
                          </Link>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      <Footer />
    </body >
    </>
  )
}
