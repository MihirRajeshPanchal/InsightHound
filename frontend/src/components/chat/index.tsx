"use client"
import React, { useEffect } from "react"
import { RainbowButton } from "../ui/rainbow-button"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useSidebar } from "../ui/sidebar"
import { Textarea } from "../ui/textarea"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import { useMutation } from "@tanstack/react-query"
import { fetchAPI } from "@/lib/utils/fetch-api"
import {
	CreateConversationBody,
	CreateConversationResponse,
} from "@/lib/types/chat"
import { TNoParams } from "@/lib/types/common"
import useAgent from "@/hooks/use-agent"
import { toast } from "sonner"
import { DashedLogo } from "@/assets/svgs"
import LoadingOverlay from "./loading-overlay"
import { cn } from "@/lib/utils"

const messages: { message: string; tag: string }[] = [
	{
		message: "Type away, and HoundBOT will fetch the answers!",
		tag: "Welcome! What challenge are we solving today?",
	},
	{
		message: "Got a startup question or market challenge? ",
		tag: "I'm here to help you sniff out the best solutions!",
	},
	{
		message: "Looking for ways to grow your startup faster?",
		tag: "Ask me about market trends, customer strategies, or competitor analysis!",
	},
	{
		message: "Let's find your edge!",
		tag: "Tell me what you need—heatmaps, growth insights, or help fine-tuning your startup strategy.",
	},
	{
		message: "Ready to take the next step?",
		tag: "I'm here to help you sniff out the best solutions!",
	},
	{
		message:
			"Ready to uncover actionable insights and unlock new opportunities?",
		tag: "Let's find your edge! ",
	},
	{
		message: "Let's sniff out some insights",
		tag: "What's your target today—markets, customers, or competitors?",
	},
]
const randomMessage = messages[Math.floor(Math.random() * messages.length)]

const useCreateConversationMutation = () => {
	const { user } = useAuth()
	const mutation = useMutation({
		mutationKey: ["create-conversation"],
		mutationFn: async (query: string) => {
			if (!user?.companyId) return
			const response = await fetchAPI<
				CreateConversationResponse,
				TNoParams,
				CreateConversationBody
			>({
				url: "/create_conversation",
				method: "POST",
				baseUrl: process.env.NEXT_PUBLIC_FLASK_URL,
				body: {
					company_id: user.companyId,
					user_id: user.id,
					query,
				},
			})
			return response.data
		},
	})
	return mutation
}

export default function ChatInitial() {
	const [query, setQuery] = React.useState<string>("")
	const {
		mutateAsync,
		isPending,
		reset,
		data: conversation,
	} = useCreateConversationMutation()
	const {
		mutate: agentMutate,
		isPending: isAgentPending,
		reset: resetAgent,
		data: agentResponse,
		isError: agentError,
	} = useAgent()
	const router = useRouter()
	const { setOpen } = useSidebar()
	async function onSubmit() {
		if (!isValid) return
		const resp = await mutateAsync(query)
		if (resp?.conversation_id) {
			agentMutate({ query, conversation_id: resp.conversation_id })
		} else {
			toast.error("Failed to create conversation. Please try again.")
		}
	}
	useEffect(() => {
		setOpen(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (conversation?.conversation_id && agentResponse) {
			router.push(`/chat/${conversation.conversation_id}`)
		}
	}, [conversation, agentResponse, router])

	useEffect(() => {
		if (agentError) {
			toast.error("Failed to chat. Please try again.")
		}
	}, [agentError])

	function handleStop() {
		reset()
		resetAgent()
	}

	const suggestions = [
		"Tell me about my startup",
		"Show me my competitors",
		"Market trends in urban India",
		"Customer segmentation of AI market",
	]

	const isLoading = isPending || isAgentPending
	const isValid = query.trim().length > 0

	return (
		<div className="flex flex-col items-center mx-4 justify-center min-h-[calc(100vh-156px)] relative">
			<LoadingOverlay show={isLoading} handleStop={handleStop} />
			<div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
				<DashedLogo className="h-[70vh] opacity-[0.05] ~dashed-logo" />
			</div>
			<div className="py-2 pl-2 pr-4 bg-sidebar-accent/20 rounded-full mb-2 text-xs text-sidebar-accent flex items-center z-10">
				<span className="bg-sidebar-accent text-zinc-950 text-xs font-semibold px-2 py-0.5 rounded-full mr-2">
					New!
				</span>
				{randomMessage.tag}
			</div>
			<h1 className="text-center text-4xl font-semibold mb-10 max-md:text-2xl bg-clip-text bg-gradient-to-b from-white to-slate-500 text-transparent z-10">
				{randomMessage.message}
			</h1>
			<div className="space-y-4 pb-2 w-full max-w-screen-md flex flex-col items-end z-10 relative bg-background border rounded-lg">
				<Textarea
					placeholder="Type your message here..."
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault()
							onSubmit()
						}
					}}
					className="w-full border-none outline-none focus-visible:ring-0 focus:ring-0 resize-none z-10 max-h-[500px]"
					value={query}
					autoFocus
					onChange={(e) => {
						setQuery(e.target.value)
						e.target.style.height =
							Math.min(e.target.scrollHeight, 200) + "px"
					}}
				/>
				<RainbowButton
					disabled={isLoading || !isValid}
					className="px-2 z-10 mx-2 group transition-all hover:w-48 w-12 duration-700"
					onClick={onSubmit}
				>
					<span className="w-0 group-hover:w-full opacity-0 group-hover:opacity-100 overflow-hidden transition-all duration-700 text-nowrap">
						Start Conversation
					</span>
					<ArrowTopRightIcon className="mx-2 " />
				</RainbowButton>
			</div>
			<div
				className={cn(
					"flex gap-2 mt-4 z-10 transition-opacity duration-700",
					!suggestions ? "opacity-0" : "opacity-100",
				)}
			>
				{suggestions.slice(0, 4).map((suggestion, index) => (
					<button
						type="button"
						onClick={() => setQuery(suggestion)}
						key={index}
						className="bg-sidebar-accent border transition-all cursor-pointer flex-nowrap text-nowrap border-sidebar-accent hover:bg-transparent hover:text-sidebar-accent text-zinc-950 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
					>
						{suggestion}
						<ArrowTopRightIcon className="w-3 h-3" />
					</button>
				))}
			</div>
		</div>
	)
}
