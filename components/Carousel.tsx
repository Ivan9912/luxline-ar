'use client'

import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/autoplay'

interface AutoCarouselProps {
  slides: string[]
}

export default function AutoCarousel({ slides }: AutoCarouselProps) {
  return (
    // Desplaza el carousel debajo del navbar (h-16 = 4rem)
    <div>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        // Ocupa todo el ancho y el alto de la viewport menos 4rem
        className="w-full h-[calc(50vh-4rem)]"
      >
        {slides.map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`slide-${idx}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
