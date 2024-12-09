"use client"
import { Conversation } from "@/lib/types/chat"
import React, { useEffect } from "react"
import { Messages } from "./components"

export default function ConversationReportPage({
	conversation,
}: {
	id: string
	conversation: Conversation
}) {
	const messages = conversation.messages || []

	const divRef = React.useRef<HTMLDivElement>(null)

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		window.print()
	// 	}, 3000)
	// }, [])

	return (
		<div className="px-4 bg-white text-black">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold pb-2">
					{conversation.title}
				</h1>
				{/* <RainbowButton
					// disabled={isPending || query.trim().length === 0}
					className="w-fit !px-2 mx-4 !py-1 h-8"
					onClick={generatePDF}
				>
					<ArrowDown size={16} className="" />
				</RainbowButton> */}
			</div>
			<hr />
			<div ref={divRef} className="h-fit">
				<Messages messages={messages} isPending={false} />
			</div>
		</div>
	)
}
