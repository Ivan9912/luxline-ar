import React from 'react';
import productsData from '../app/BBDD/PRODUCTS_LIST2.json';
import { ImageCard as Card, CarouselClient } from '../components';

// Revalidate cada 24 horas (ISR)
export const revalidate = 86400

// Tipos según PRODUCTS_LIST.json
interface ListItem { name: string; route: string };
interface ListOfType { name: string; route: string; content: string[]; list_of_items?: Record<string, ListItem> };
interface Category { name: string; downloadUrl: string; content: string[]; list_of_types: Record<string, ListOfType>; img: string, description: string, downloadName: string };
type ProductsData = Record<string, Category>[];

export default function Page() {
  // productsData es importado desde el JSON local en build time
  const dataArray = (productsData as unknown) as ProductsData
  const categoriesMap = dataArray[0]
  const categoriesEntries = Object.entries(categoriesMap) as [string, Category][]

  // rutas a las imágenes de tu carousel
  const slides = ['/images/carousel/1-1.jpg', '/images/carousel/1-2.jpg', '/images/carousel/1-3.jpg', '/images/carousel/1-4.jpg', '/images/carousel/1-5.jpg', '/images/carousel/1-6.jpg', '/images/carousel/1-7.jpg',]

  return (
    <>
      {/* ===== Carrusel full‑width ===== */}
      <div className="absolute top-0 left-0 w-screen z-0">
        <CarouselClient slides={slides} />
      </div>
      

      {/* Para que el resto de contenido no quede debajo del carousel: */}
      <div className="pt-80">
        {/* Ajusta ese padding-top si cambias la altura */}

        {/* ===== Tu contenido normal ===== */}
        {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Página en construcción
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Estamos trabajando en esto. ¡Vuelve pronto!
            </p>
          </div>
        </div> */}
        <main className="flex flex-col items-center justify-center py-auto min-h-screen">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
            {categoriesEntries.map(([key, cat], i) => {
              const count = Array.isArray(cat.content) ? cat.content.length : 0
              // Extraer slug de cat.route:
              const slug = key.toLowerCase()

              return (
                <div key={i} className="flex justify-center ">
                  <Card
                    description={cat.description}
                    name={cat.name}
                    imageSrc={`/${cat.img}`}
                    // aquí usamos el slug correcto
                    srcLink={`/api/download/${slug}`}
                    counts={count}
                    downloadName={cat.downloadName}
                  />
                </div>
              )
            })}
          </section>
        </main>
      </div>
    </>
  )
}