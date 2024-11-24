"use client"

import { removeToken } from "@/lib/utils/token"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
    const router = useRouter()
    useEffect(() => {
        removeToken();
        router.push('/auth');
    }, [router])

    return (
        <div className='min-h-screen flex justify-center items-center text-2xl font-bold'>Logging out...</div>
    )
}
