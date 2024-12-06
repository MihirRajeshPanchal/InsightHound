"use client"
import { useSidebar } from '@/components/ui/sidebar'
// import { ActionEnum, Message, RoleEnum } from '@/lib/types/chat'
import React, { useEffect } from 'react'

// const sampleConversation: Message[] = [
//     {
//         id: "123",
//         createdAt: new Date(),
//         role: RoleEnum.USER,
//         action: ActionEnum.QUERY,
//         query: "What is the revenue of Apple?"
//     },
//     {
//         id: "124",
//         createdAt: new Date(),
//         role: RoleEnum.AI,
//         action: ActionEnum.RESPONSE_MD,
//         data: "Apple's revenue is $100 billion"
//     },
//     {
//         id: "125",
//         createdAt: new Date(),
//         role: RoleEnum.USER,
//         action: ActionEnum.QUERY,
//         query: "What is the revenue of Google?"
//     }
// ]
export default function ConversationPage({ id }: { id: string }) {
    console.log(id)
    const { setOpen } = useSidebar()
    useEffect(() => {
        setOpen(true)
    }, [setOpen])

    return (
        <div>
            <h1></h1>
        </div>
    )
}
