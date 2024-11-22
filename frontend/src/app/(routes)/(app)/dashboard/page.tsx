"use client"
import { useAuth } from '@/lib/hooks/use-auth'
import React from 'react'

export default function Page() {
    const { user } = useAuth();
    console.log({ user })
    return (
        <div>dashboard</div>
    )
}
