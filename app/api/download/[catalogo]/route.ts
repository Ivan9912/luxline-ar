import { NextRequest } from 'next/server'
import productsConfig from '../../../BBDD/PRODUCTS_LIST2.json'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ catalogo: string }>  }
) {
  const { catalogo } = await params
  const slug = catalogo.toUpperCase()
  const entry = (productsConfig as any)[0][slug]
  if (!entry) return new Response('No encontrado', { status: 404 })

  // 1) Extraemos el ID sea cual sea el formato de URL
  const rawUrl: string = entry.downloadUrl
  let fileIdMatch = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)      // "/file/d/ID"
  if (!fileIdMatch) fileIdMatch = rawUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/) // "?id=ID"
  if (!fileIdMatch) {
    return new Response('ID de Drive no válido', { status: 400 })
  }
  const fileId = fileIdMatch[1]

  // 2) Construimos la URL de descarga directa
  const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
  const filename = entry.downloadName || 'download.pdf'

  // 3) Proxy‑fetch a Drive
  const driveRes = await fetch(driveUrl, { cache: 'no-store' })
  if (!driveRes.ok) {
    return new Response('Error al obtener archivo', { status: driveRes.status })
  }
  const arrayBuffer = await driveRes.arrayBuffer()

  // 4) Devolvemos el PDF con Content‑Disposition
  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
