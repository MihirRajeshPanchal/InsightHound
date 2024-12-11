"use client"
import { useSidebar } from "@/components/ui/sidebar"
import { ActionEnum, Conversation, Message, RoleEnum } from "@/lib/types/chat"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowTopRightIcon, ChatBubbleIcon } from "@radix-ui/react-icons"
import useAgent from "@/hooks/use-agent"
import { toast } from "sonner"
import { ArrowRight, StopCircle, X } from "lucide-react"
import { parse } from "@/lib/utils/parse-msg"
import { Messages } from "./components"
import { Button } from "@/components/ui/button"

export default function ConversationPage({
	id,
	conversation,
}: {
	id: string
	conversation: Conversation
}) {
	const [messages, setMessages] = React.useState<Message[]>(
		conversation?.messages || [],
	)
	const [query, setQuery] = React.useState<string>("")
	const { open, setOpen } = useSidebar()
	const { mutateAsync, isPending, reset } = useAgent()
	const [openChat, setOpenChat] = useState(true)

	const divRef = React.useRef<HTMLDivElement>(null)

	useEffect(() => {
		setOpen(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	function addMessage(message: Message) {
		setMessages((prev) => [...prev, message])
	}
	useEffect(() => {
		const messageEl = document.getElementById(
			`message-${messages.length - 1}`,
		)
		if (messageEl) {
			messageEl.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	async function onSubmit(query: string) {
		if (!query.trim().length) return
		addMessage({
			id: Math.random().toString(),
			createdAt: new Date(),
			role: RoleEnum.USER,
			action: ActionEnum.QUERY,
			query,
		})
		setQuery("")
		// return;
		const response = await mutateAsync({ query, conversation_id: id })
		if (!response) {
			toast.error("Failed to chat. Please try again.")
			addMessage({
				id: Math.random().toString(),
				createdAt: new Date(),
				role: RoleEnum.AI,
				action: ActionEnum.RESPONSE_MD,
				data: {
					data: "Sorry, I am not able to process your request at the moment.",
				},
				suggestions:
					messages.filter((m) => m.role === RoleEnum.AI).pop()
						?.suggestions || [],
			})
			return
		}
		if (response.length === 0) {
			toast.info("Please provide linkedin url of the desired company")
		}
		response.forEach((msg) => addMessage(msg))
	}

	const suggestionsRaw = messages.filter((m) => m.role === RoleEnum.AI).pop()
		?.suggestions || [
		"Tell me about my startup",
		"Show me my competitors",
		"Market trends in urban India",
		"Customer segmentation of AI market",
	]
	const suggestions: string[] =
		typeof suggestionsRaw === "string"
			? parse(suggestionsRaw)
			: suggestionsRaw

	return (
		<div className="*:px-4 h-full overflow-auto grid grid-rows-[auto_1fr_auto]">
			<hr />
			{/* Messages */}
			<div className="">
				<ScrollArea className="~h-[65vh] *:pt-4 ">
					<div ref={divRef} className="">
						<Messages messages={messages} isPending={isPending} />
					</div>
				</ScrollArea>
			</div>

			<div className="!px-0 py-2 ~rounded-xl sticky left-0 bottom-0 z-[999]">
				{/* Suggestions */}
				<ScrollArea
					className={cn(
						`relative max-w-[100vw] w-full | px-8 pb-2 after:hidden after:absolute after:inset-0 after:pointer-events-none after:bg-[linear-gradient(to_right,hsl(var(--background))_5%,transparent_10%_90%,hsl(var(--background))_95%)] ${
							open
								? "md:max-w-[calc(100vw_-_2rem_-_16rem)]"
								: "md:max-w-[calc(100vw_-_2rem)]"
						} transition-opacity `,
						!openChat
							? "opacity-0 pointer-events-none"
							: "opacity-100",
					)}
				>
					<ScrollBar
						orientation="horizontal"
						className="opacity-0 pointer-events-none ~lg:pointer-events-auto"
					/>
					<div
						className={cn(
							"flex gap-2 z-10 transition-opacity duration-700 lg:justify-center overflow-auto",
							!suggestions || isPending
								? "opacity-0"
								: "opacity-100",
						)}
					>
						{suggestions.slice(0, 4).map((suggestion, index) => (
							<button
								type="button"
								onClick={() => onSubmit(suggestion)}
								key={index}
								// className="bg-sidebar-accent border transition-all cursor-pointer flex-nowrap text-nowrap border-sidebar-accent hover:bg-transparent hover:text-sidebar-accent text-text text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
								className="group flex items-center gap-2 transition-colors text-nowrap text-xs font-medium text-text/75 hover:text-text px-2 py-1 bg-[radial-gradient(hsl(var(--background)/30%),hsl(var(--background)/100%))] backdrop-blur border border-text/20 rounded-full"
							>
								{suggestion}
								<ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
							</button>
						))}
					</div>
				</ScrollArea>
				{/* ChatBox */}
				<div className="flex gap-4 shadow-md w-full ~max-w-screen-2xl mx-auto pl-4 pr-8">
					<Button
						onClick={() => setOpenChat((p) => !p)}
						className="size-6 self-end bg-foreground/70 backdrop-blur"
					>
						{openChat ? (
							<X />
						) : (
							<ChatBubbleIcon className="-scale-x-100" />
						)}
					</Button>
					<Textarea
						autoFocus
						rows={1}
						wrap="soft"
						placeholder="Type your message here..."
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault()
								onSubmit(query)
							}
						}}
						className={cn(
							"w-full resize-none border bg-background/70 backdrop-blur focus:border-text/10 rounded-lg ring-1 ring-text/10 focus:ring-2 focus:ring-text/30 transition-all duration-500",
							!openChat
								? "opacity-0 pointer-events-none"
								: "opacity-100",
						)}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<RainbowButton
						disabled={!isPending && query.trim().length === 0}
						className={cn(
							"~mt-2 px-4 transition-opacity duration-500",
							!openChat
								? "!opacity-0 pointer-events-none"
								: "opacity-100",
						)}
						onClick={() => (isPending ? reset() : onSubmit(query))}
					>
						{isPending ? (
							<StopCircle className="size-6" />
						) : (
							<ArrowTopRightIcon className="size-6" />
						)}
					</RainbowButton>
				</div>
			</div>
		</div>
	)
}
