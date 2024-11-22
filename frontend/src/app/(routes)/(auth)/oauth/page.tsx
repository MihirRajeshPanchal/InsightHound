import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Page() {
    return (
        <div className='flex justify-center items-center p-24 min-h-screen'>
            <div className='flex flex-col items-center gap-6'>
                <h1 className='font-semibold text-2xl'>pls use email-password</h1>
                <img src="/images/chill.png" className='w-[200px]' alt="chill-guy" />
                <Link href="/auth">
                    <Button className='mt-4'>Go to Authentication</Button>
                </Link>
            </div>
        </div>
    )
}
