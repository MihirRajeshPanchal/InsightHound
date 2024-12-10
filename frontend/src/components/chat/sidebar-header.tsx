"use client"
import React from "react"
import { RainbowButton } from "../ui/rainbow-button"
import { ArrowDown } from "lucide-react"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import { Conversation } from "@/lib/types/chat"
import { cn } from "@/lib/utils"

export default function SidebarHeader() {
	const { id } = useParams()
	const { data: conversation } = useQuery({
		queryKey: ["conversation", id],
		queryFn: async () => {
			const resp = await fetchAPI<Conversation>({
				url: `/conversations?conversation_id=${id}`,
				method: "GET",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
				isConversation: true,
			})
			return resp.data
		},
		enabled: !!id,
	})
	const generatePDF = async () => {
		if (!id || !conversation) return
		window.open(`/report/${id}`, "_blank")
	}

	return (
		<div
			className={cn(
				"w-full flex justify-between items-center transition-opacity duration-500",
				conversation ? "opacity-100" : "opacity-0 pointer-events-none",
			)}
		>
			<h1 className="lg:text-2xl font-bold">{conversation?.title}</h1>
			<RainbowButton
				// disabled={isPending || query.trim().length === 0}
				className="w-fit !px-2 mx-4 !py-1 h-8"
				onClick={generatePDF}
			>
				<ArrowDown size={16} className="" />
			</RainbowButton>
		</div>
	)
}
