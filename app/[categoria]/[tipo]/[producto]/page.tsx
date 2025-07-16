import path from 'path'
import fs from 'fs/promises'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface ProductDetail {
  name: string
  route: string
  description: string
  sku: string
  physics: Record<string, string>
  commercial: Record<string, string>
  image: string
}

export async function generateStaticParams() {
  const listPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const raw = await fs.readFile(listPath, 'utf-8')
  const all = JSON.parse(raw) as Record<string, any>

  const params: { categoria: string; tipo: string; producto: string }[] = []

  for (const categoria of Object.keys(all)) {
    const tipoDir = path.join(process.cwd(), 'app', 'BBDD', categoria)
    let tipos: string[] = []
    try {
      tipos = (await fs.readdir(tipoDir)).filter(f => f.endsWith('.json'))
    } catch {
      continue
    }
    for (const file of tipos) {
      const tipoSlug = file.replace('.json', '')
      const tipoRaw = await fs.readFile(path.join(tipoDir, file), 'utf-8')
      const tipoJson = JSON.parse(tipoRaw)
      for (const productoKey of Object.keys(tipoJson.list_of_items || {})) {
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

  // 1) Validar categoría
  const listPath = path.join(process.cwd(), 'app', 'BBDD', 'PRODUCTS_LIST.json')
  const rawList = await fs.readFile(listPath, 'utf-8')
  const all = JSON.parse(rawList) as Record<string, any>
  if (!all[categoria]) return notFound()

  // 2) Validar tipo
  const tipoPath = path.join(process.cwd(), 'app', 'BBDD', categoria, `${tipo}.json`)
  let tipoJson: any
  try {
    const rawTipo = await fs.readFile(tipoPath, 'utf-8')
    tipoJson = JSON.parse(rawTipo)
  } catch {
    return notFound()
  }
  if (!tipoJson.list_of_items?.[producto]) return notFound()

  // 3) Detalle
  const detalle = tipoJson.list_of_items[producto] as ProductDetail

  return (
    <main>
      <div className="flex flex-col items-center bg-gradient-to-b from-gray-800 to-gray-400 py-16">
        <Image
          src={`/images/${detalle.image}`}
          alt={detalle.name}
          width={600}
          height={600}
          className="rounded-lg"
        />
        {/* ... resto de la UI ... */}
      </div>
    </main>
  )
}
