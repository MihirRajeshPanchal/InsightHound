import ConversationPage from "@/components/chat/conversation"
import NotFound from "@/components/chat/conversation/not-found"
import { Conversation } from "@/lib/types/chat"
import { fetchAPI } from "@/lib/utils/fetch-api"
import React from "react"

export default async function Page({
	params: { id },
}: {
	params: { id: string }
}) {
	const resp = await fetchAPI<Conversation>({
		url: `/conversations?conversation_id=${id}`,
		method: "GET",
		baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
		isConversation: true,
	})

	if (!resp.data) {
		return <NotFound />
	}
	return <ConversationPage id={id} conversation={resp.data} />
}
