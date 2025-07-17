'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dinámico client‑only
const AutoCarousel = dynamic(
  () => import('./Carousel'), 
  { ssr: false }
)

interface CarouselClientProps {
  slides: string[]
}

export default function CarouselClient({ slides }: CarouselClientProps) {
  return <AutoCarousel slides={slides} />
}
