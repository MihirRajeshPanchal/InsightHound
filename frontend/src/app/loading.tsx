import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
    return (
        <div className='min-h-[100svh-56px] flex flex-col p-12 md:p-24'>
            <Skeleton className='h-16 w-[60vw]' />
            <Skeleton className='h-8 w-[80vw] mt-12' />
            <Skeleton className='h-8 w-[80vw] mt-2' />
            <div className='grid grid-cols-4 mt-12 gap-6'>
                {[1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Skeleton key={i} className='h-48 w-full' />
                ))}
            </div>
        </div>
    )
}
