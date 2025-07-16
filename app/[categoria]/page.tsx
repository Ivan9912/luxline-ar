import fs from 'fs/promises'
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
type ProductsRaw = Record<string, Category>[]

export async function generateStaticParams() {
  const jsonPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = await fs.readFile(jsonPath, 'utf-8')
  const productsData = (JSON.parse(raw) as ProductsRaw)[0]

  return Object.values(productsData).map(cat => ({
    categoria: cat.route.replace(/^\//, '').toLowerCase()
  }))
}

export default async function CategoriaPage({
  params,
}: {
  params: { categoria: string }
}) {
  const { categoria } = params
  const jsonPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = await fs.readFile(jsonPath, 'utf-8')
  const productsData = (JSON.parse(raw) as ProductsRaw)[0]

  const entry = Object.values(productsData).find(
    cat => cat.route.replace(/^\//, '').toLowerCase() === categoria
  )
  if (!entry) return notFound()

  // Mapear tipos con slug y displayName
  const tipos = entry.content.map(displayName => {
    const key = displayName.split(' ')[0]
    return {
      slug: key.toLowerCase(),
      displayName
    }
  })

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{entry.name}</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tipos.map(tipo => (
          <ImageCard
            key={tipo.slug}
            name={tipo.displayName}
            imageSrc={`/${entry.img}`}
            acceptLink={`/${categoria}/${tipo.slug}`}
            cancelLink={`/${categoria}/${tipo.slug}`}
            counts={entry.content.length}
          />
        ))}
      </section>
    </main>
  )
}
