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
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className="w-screen"
    >
      {slides.map((src, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-screen">
            <Image
              src={src}
              width={1200}
              height={400}
              alt={`slide-${idx}`}
              className="w-full h-auto object-cover"
              priority={idx === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
