import GridBackground from '@/components/custom/contact/grid-bg'
import React from 'react'

export default function Page() {
    return (
        <div className='min-h-screen grid *:[grid-area:1/-1]'>
            <GridBackground />
            <div className="gridBgFade | h-screen sticky top-0 z-10"></div>
            <div className="wrapper | z-20 max-w-screen-[1440px] relative">

            </div>
        </div>
    )
}
