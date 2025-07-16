// 🚫 Quita cualquier 'use client'

// Tipos concretos en lugar de any
import path from 'path'
import fs from 'fs/promises'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { ProductSpecs } from '../../../../components/ProductSpecs' // ejemplo de sub‑componente
// si no existe, crea uno para renderizar physics/commercial en lugar de inline

interface ProductDetail {
  name: string
  route: string
  description: string
  sku: string
  physics: Record<string, string>
  commercial: Record<string, string>
  image: string
}

interface TipoJson {
  list_of_items?: Record<string, ProductDetail>
}

export async function generateStaticParams() {
  const listPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = await fs.readFile(listPath, 'utf-8')
  // aquí defines un tipo para todo el JSON si quieres:
  type ProductsList = Record<string, { /* tus props de categoría */ }>
  const all = JSON.parse(raw) as ProductsList

  const params: { categoria: string; tipo: string; producto: string }[] = []

  for (const categoria of Object.keys(all)) {
    const tipoDir = path.join(process.cwd(), 'app', 'BBDD', categoria)
    let archivos: string[]
    try {
      archivos = (await fs.readdir(tipoDir)).filter(f => f.endsWith('.json'))
    } catch {
      continue
    }
    for (const file of archivos) {
      const tipoSlug = file.replace('.json', '')
      const rawTipo = await fs.readFile(path.join(tipoDir, file), 'utf-8')
      const tipoJson = JSON.parse(rawTipo) as TipoJson
      for (const productoKey of Object.keys(tipoJson.list_of_items ?? {})) {
        params.push({ categoria, tipo: tipoSlug, producto: productoKey })
      }
    }
  }
  return params
}

export default async function ProductoPage({
  params,
}: {
  params: { categoria: string; tipo: string; producto: string }
}) {
  const { categoria, tipo, producto } = params

  // Valido categoría
  const listPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const rawList = await fs.readFile(listPath, 'utf-8')
  const all = JSON.parse(rawList) as Record<string, any>  // si defines un tipo, cámbialo aquí
  if (!all[categoria]) return notFound()

  // Valido tipo
  const tipoPath = path.join(process.cwd(), 'app', 'BBDD', categoria, `${tipo}.json`)
  let tipoJson: TipoJson
  try {
    const rawTipo = await fs.readFile(tipoPath, 'utf-8')
    tipoJson = JSON.parse(rawTipo) as TipoJson
  } catch {
    return notFound()
  }
  const detalle = tipoJson.list_of_items?.[producto]
  if (!detalle) return notFound()

  return (
    <main className="px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">{detalle.name}</h1>

        {/* Imagen */}
        <Image
          src={`/images/${detalle.image}`}
          alt={detalle.name}
          width={600}
          height={600}
          className="w-full h-auto rounded-lg"
          priority
        />

        {/* Descripción */}
        <p className="text-gray-700">{detalle.description}</p>

        {/* Especificaciones: física y comercial */}
        <ProductSpecs physics={detalle.physics} commercial={detalle.commercial} />

        {/* Botón de download */}
        <a
          href={`/datasheets/${detalle.sku}.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Descargar Datasheet
        </a>
      </div>
    </main>
  )
}
