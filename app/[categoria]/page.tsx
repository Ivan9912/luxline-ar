import React from 'react'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { ImageCard } from '../../components'

interface ListOfType {
  name: string
  route: string
  content: string[]
  list_of_items?: Record<string, unknown>
}
interface Category {
  name: string
  route: string
  img: string
  content: string[]
  list_of_types: Record<string, ListOfType>
}

// JSON raw: un arreglo con un solo objeto
type ProductsRaw = Record<string, Category>[]

// Después de extraer [0], obtenemos un objeto plano
type ProductsData = Record<string, Category>

// Next genera `/[categoria]`
export async function generateStaticParams() {
  const jsonPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as ProductsRaw
  const productsData = raw[0] as ProductsData

  return Object.values(productsData).map((catObj) => {
    const slug = catObj.route.replace(/^\//, '').toLowerCase()
    return { categoria: slug }
  })
}

// **Marcar el componente como async** para que Next pueda “await” internamente a params
export default async function CategoriaPage({ params }: { params: { categoria: string } }) {
  const { categoria: categoriaParam } = await params

  // 1) Leer el JSON completo (arreglo con un solo objeto)
  const jsonPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) as ProductsRaw
  const productsData = raw[0] as ProductsData

  // 2) Buscar la categoría cuya route sin "/" coincida con `categoriaParam`
  const categoryEntry = Object.entries(productsData).find(([key, catObj]) => {
    const slug = catObj.route.replace(/^\//, '').toLowerCase()
    return slug === categoriaParam
  })

  if (!categoryEntry) {
    return notFound()
  }

  const [catKey, categoryData] = categoryEntry
  // catKey = "LED", categoryData = { name: "Led", route: "/led", img: "bulbos.png", … }

  // 3) Leer todos los archivos JSON dentro de app/BBDD/[catKey]
  const categoryDir = path.join(process.cwd(), 'app', 'BBDD', catKey)
  if (!fs.existsSync(categoryDir)) {
    return notFound()
  }
  const filenames = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.json'))

  // 4) Mapear a un arreglo de tipos con slug y displayName
  const tipos = filenames.map((filename) => {
    const fullPath = path.join(categoryDir, filename)
    const fileJson = JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as ListOfType
    const slugTipo = filename.replace('.json', '').toLowerCase()
    return {
      slug: slugTipo,
      displayName: fileJson.name,
    }
  })

  return (
    <main className="flex flex-col items-center justify-center py-20 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">{categoryData.name}</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {tipos.map((tipo) => (
          <div key={tipo.slug} className="flex justify-center">
              <ImageCard
                name={tipo.displayName}
                imageSrc={`/${categoryData.img}`}  
                imageLink={`/${categoriaParam}/${tipo.slug}`}
                acceptLink={`/${categoriaParam}/${tipo.slug}`}
                cancelLink={`/${categoriaParam}/${tipo.slug}`}
                counts={0}
              />
          </div>
        ))}
      </section>
    </main>
  )
}
