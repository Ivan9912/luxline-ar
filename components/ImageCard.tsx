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
    <div className="group rounded-lg">
      {/* Overlay de fondo */}
      <div className={`
        bg-gradient-to-br from-black to-transparent 
        transition-opacity duration-300
        group-hover:opacity-60
      `} />

      {/* Imagen con link */}
      <Link href={imageLink}>
        <img
          src={imageSrc}
          alt={alt}
          className={`
              object-cover
              rounded-lg
              opacity-90
              transition-transform duration-300
              group-hover:scale-95
            `}
        />
      </Link>

      {/* Botones */}
      <div className={`
        absolute inset-0
        flex items-center justify-center space-x-4
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      `}>
        <Link href={acceptLink} className='bg-white text-black px-4 py-2
            border-2 border-white rounded-md
            transition-colors duration-300
            hover:bg-black hover:text-white'>
          Aceptar
        </Link>
        <Link href={cancelLink} className='px-4 py-2
            border-2 border-white rounded-md
            transition-colors duration-300
            hover:bg-white hover:text-black'>
          Cancelar
        </Link>
      </div>
    </div>
  )
}

export default ImageCard
