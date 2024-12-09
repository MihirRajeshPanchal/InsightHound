import NotFound from "@/components/chat/conversation/not-found"
import { sampleConversation } from "@/lib/sample"
import { Conversation } from "@/lib/types/chat"
import { fetchAPI } from "@/lib/utils/fetch-api"
import dynamic from "next/dynamic"
import React from "react"

const ConversationReportPage = dynamic(
	() => import("@/components/chat/conversation/reportTwo"),
	{ ssr: false },
)

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
		if (process.env.NODE_ENV === "development") return <NotFound />
	}
	return (
		<ConversationReportPage
			id={id}
			conversation={resp.data || sampleConversation}
		/>
	)
}

export const revalidate = 0
