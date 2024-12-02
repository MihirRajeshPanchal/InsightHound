import { Input } from '@/components/ui/input'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { GetProductComparisonBody, Products } from '@/lib/types/api'
import { UseMutationResult } from '@tanstack/react-query'
import React, { Dispatch, SetStateAction } from 'react'

interface FeatureFormProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    onSubmit: () => void,
    mutation: UseMutationResult<Products | null, Error, GetProductComparisonBody, unknown>
}
export default function FeatureForm({ onSubmit, setValue, value, mutation }: FeatureFormProps) {
    const { isPending } = mutation
    return (
        <div className="flex flex-col items-center mx-4 justify-center min-h-[calc(100vh-56px)]">
            <div className="py-2 pl-2 pr-4 bg-cyan-400/20 rounded-full mb-2 text-xs text-cyan-300 flex items-center">
                <span className="bg-cyan-300 text-black text-xs font-semibold px-2 py-0.5 rounded-full mr-2">New!</span>
                Try this if you have multiple lines of products
            </div>
            <h1 className="text-center text-4xl font-semibold mb-10 max-md:text-2xl bg-clip-text bg-gradient-to-b from-white to-slate-500 text-transparent">
                Enter the product you want to get comparisons for
            </h1>
            <div className="space-y-4 pb-2 w-full max-w-screen-md">
                <Input onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit()
                    }
                }} className='w-full' value={value} onChange={(e) => setValue(e.target.value)} />
                <RainbowButton disabled={isPending} className='w-full' onClick={onSubmit}>Get competitors</RainbowButton>
            </div>
        </div>
    )
}
