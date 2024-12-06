import ConversationPage from '@/components/chat/conversation'
import React from 'react'

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <ConversationPage id={id} />
    )
}
