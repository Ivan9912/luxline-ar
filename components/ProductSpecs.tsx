'use client'

import React, { FC } from 'react'

interface ProductSpecsProps {
  physics: Record<string, string>
  commercial: Record<string, string>
}

export const ProductSpecs: FC<ProductSpecsProps> = ({ physics, commercial }) => {
  return (
    <div className="space-y-8">
      {/* Información Física */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Información Física</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(physics).map(([label, value]) => (
            <div key={label} className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">{label}</span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Información Comercial */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Información Comercial</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {Object.entries(commercial).map(([label, value]) => (
            <div key={label} className="flex justify-between border-b pb-1">
              <span className="font-medium text-gray-700">{label}</span>
              <span className="text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
