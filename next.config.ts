// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Agrega aquí el host (y puerto) desde el que haces las peticiones
  allowedDevOrigins: ['172.16.5.6:3000'],

  // ...otras opciones que ya tengas
}

module.exports = nextConfig
