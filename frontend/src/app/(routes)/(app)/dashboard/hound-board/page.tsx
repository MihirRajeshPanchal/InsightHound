import dynamic from 'next/dynamic'
import React from 'react'

const HoundBoard = dynamic(() => import('@/components/custom/hound-board'), { ssr: false })
export default function Page() {
    return (
        <HoundBoard />
    )
}
