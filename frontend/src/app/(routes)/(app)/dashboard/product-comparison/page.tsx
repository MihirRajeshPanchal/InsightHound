import dynamic from 'next/dynamic'
import React from 'react'
const ProductComparison = dynamic(() => import('@/components/custom/product-comparison'), { ssr: false })

export default function Page() {
  return (
    <ProductComparison />
  )
}
