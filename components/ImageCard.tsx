// components/ImageCard.tsx
import Link from 'next/link'
import { FC } from 'react'

type ImageCardProps = {
  imageSrc: string
  imageLink: string
  acceptLink: string
  cancelLink: string
  alt?: string
}

const ImageCard: FC<ImageCardProps> = ({
  imageSrc,
  imageLink,
  acceptLink,
  cancelLink,
  alt = 'Imagen'
}) => {
  return (
    <div className="relative flex justify-center group w-64 h-64 overflow-hidden rounded-lg ">
      {/* Overlay de fondo */}
      <div className={`
        absolute inset-0
        bg-gradient-to-br from-white from-0% via-black via-5% to-black/90 to-100%
        transition-opacity duration-300
        group-hover:opacity-95
      `} />

      {/* Imagen con link */}
      <Link href={imageLink} className="flex flex-col items-center justify-center w-4/5 h-4/5">
        <img
          src={imageSrc}
          alt={alt}
          className={`
              w-10/12 h-10/12 object-cover
              rounded-lg
              opacity-90
              transition-transform duration-300
              group-hover:scale-95
            `}
        />
        <p>Hola</p>
      </Link>

      {/* Botones */}
      <div className={`
        absolute inset-2
        flex items-end justify-center space-x-4
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      `}>
        <Link href={acceptLink} className='px-4 py-2 text-xs text-white bg-transparent
            border-2 border-white rounded-md
            transition-colors duration-300
            hover:bg-white hover:text-black'>
          Ficha Técnica
        </Link>
        <Link href={cancelLink} className='px-4 py-2 text-xs text-white bg-transparent
            border-2 border-white rounded-md
            transition-colors duration-300
            hover:bg-white hover:text-black'>
          Ver producto
        </Link>
      </div>
    </div>
  )
}

export default ImageCard
