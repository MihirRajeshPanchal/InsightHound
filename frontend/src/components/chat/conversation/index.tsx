"use client"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { ActionEnum, Conversation, Message, RoleEnum } from "@/lib/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import React, { useEffect } from "react"
import { CompanyCard } from "../market-intelligence/company-card"
import { convertMarkdownToHtml } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import {
	sampleBoardResponse,
	sampleCompetitorMapping,
	sampleHeatmapData,
	sampleLinkedinData,
	sampleMdResponse,
	sampleNewsResponse,
	sampleProductComparison,
	sampleQuestions,
	sampleSegment,
	sampleSelf,
} from "@/lib/sample"
import News from "../market-intelligence/news"
import ProductCards from "../product-comparison/cards"
import AudienceSegment from "../audience-segments"
import QuestionnaireCard from "../feedback-hub/card"
import Board from "../hound-board/board"
import CompetitorMapping from "../competitor-mapping"
import SendPage from "../certisend/send-page"
import LinkedinForm from "../audience-outreach/form"
import useAgent from "@/hooks/use-agent"
import { toast } from "sonner"
import Loader from "../loader"
import MapComponent from "@/components/custom/map/client"

const sampleConversationMessages: Message[] = [
	{
		id: "123",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "Which emerging technologies should I be aware of?",
	},
	{
		id: "124",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.RESPONSE_MD,
		data: sampleMdResponse,
	},
	{
		id: "125",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "What is our copany's current status?",
	},
	{
		id: "126",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.ABOUT,
		data: sampleSelf,
	},
	{
		id: "127",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "Any treding news?",
	},
	{
		id: "128",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.FEED,
		data: sampleNewsResponse,
	},
	{
		id: "129",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "Are there any products that are similar to Gemini?",
	},
	{
		id: "130",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.PRODUCT,
		data: sampleProductComparison,
	},
	{
		id: "131",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "What would be my go to market segments for this product?",
	},
	{
		id: "132",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.SEGMENTATION,
		data: sampleSegment.segments,
	},
	{
		id: "133",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "How would i find the beachhead market for this?",
	},
	{
		id: "134",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.QUESTIONNAIRE,
		data: sampleQuestions,
	},
	{
		id: "135",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "What should be my plan of action?",
	},
	{
		id: "136",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.BOARD,
		data: sampleBoardResponse.tasks,
	},
	{
		id: "137",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "What are my rival companies?",
	},
	{
		id: "138",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.RIVAL,
		data: { rivals: sampleCompetitorMapping, self: sampleSelf },
	},
	{
		id: "139",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "How can i reach my users?",
	},
	{
		id: "140",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.MAIL_INITIATE,
	},
	{
		id: "141",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "How can i reach my potential employees?",
	},
	{
		id: "142",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.LINKEDIN,
		data: sampleLinkedinData,
	},
	{
		id: "143",
		createdAt: new Date(),
		role: RoleEnum.USER,
		action: ActionEnum.QUERY,
		query: "How can i reach my potential employees?",
	},
	{
		id: "144",
		createdAt: new Date(),
		role: RoleEnum.AI,
		action: ActionEnum.HEATMAP,
		data: sampleHeatmapData,
	},
]
const sampleConversation: Conversation = {
	id: "123",
	messages: sampleConversationMessages,
	createdAt: new Date(),
	summary: {},
	title: "Customer Support in metropolitian areas during weekends",
	updatedAt: new Date(),
}

function UserMessage({ message }: { message: Message }) {
	return (
		message.role === RoleEnum.USER && (
			<>
				<div className="flex gap-4 py-2">
					<Avatar className="size-8 rounded-xl overflow-clip">
						<AvatarImage
							src={`https://avatar.vercel.sh/${"user1156" + message.id}.png`}
							alt={"user"}
						/>
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<h3 className="font-semibold">{message.query}</h3>
				</div>
				<Separator className="mt-2 opacity-40" />
			</>
		)
	)
}

function RenderActionCard({ message }: { message: Message }) {
	switch (message.action) {
		case ActionEnum.ABOUT:
			return <CompanyCard company={message.data} />
		case ActionEnum.FEED:
			return <News data={message.data} />
		case ActionEnum.PRODUCT:
			return <ProductCards data={message.data} />
		case ActionEnum.SEGMENTATION:
			return <AudienceSegment data={message.data} />
		case ActionEnum.QUESTIONNAIRE:
			return (
				<QuestionnaireCard
					questions={message.data.questions}
					form_url={message.data.form_url}
				/>
			)
		case ActionEnum.BOARD:
			return <Board data={message.data} />
		case ActionEnum.RIVAL:
			return (
				<CompetitorMapping
					data={message.data.rivals}
					userData={message.data.self}
				/>
			)
		case ActionEnum.MAIL_INITIATE:
			return <SendPage />
		case ActionEnum.LINKEDIN:
			return <LinkedinForm data={message.data} />
		case ActionEnum.HEATMAP:
			return <MapComponent data={message.data} />
		case ActionEnum.RESPONSE_MD:
			return (
				<div
					className="whitespace-pre-wrap"
					dangerouslySetInnerHTML={{
						__html: convertMarkdownToHtml(message.data),
					}}
				/>
			)
		default:
			return <div>HoundBot failed to cook</div>
	}
}

function AIMessage({ message }: { message: Message }) {
	return (
		message.role === RoleEnum.AI && (
			<>
				<div className="flex gap-4 py-2 pl-0 md:pl-12">
					<RenderActionCard message={message} />
				</div>
				<Separator className="my-4" />
			</>
		)
	)
}

function Messages({ messages, isPending }: { messages: Message[], isPending: boolean }) {
	return messages.map((message, idx) => (
		<div key={idx} id={`message-${idx}`}>
			<UserMessage message={message} />
			<AIMessage message={message} />
			{(isPending && idx === messages.length - 1) &&
				<div className="flex justify-center gap-2 flex-col items-center [--loaderWidth:100px] [--loaderTextWidth:100px] [--loaderDuration:1.5s] p-4">
					<Loader />
				</div>
			}
		</div>
	))
}

export default function ConversationPage({ id, conversation }: { id: string, conversation: Conversation }) {

	console.log({ conversation, id, sampleConversation })
	const [messages, setMessages] = React.useState<Message[]>(conversation?.messages || [])
	const [query, setQuery] = React.useState<string>("")
	const { setOpen } = useSidebar()
	const { mutateAsync, isPending } = useAgent()

	useEffect(() => {
		setOpen(true)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	function addMessage(message: Message) {
		setMessages((prev) => [...prev, message])
	}
	useEffect(() => {
		const messageEl = document.getElementById(`message-${messages.length - 1}`)
		if (messageEl) {
			messageEl.scrollIntoView({ behavior: "smooth" })
		}
	}, [messages])

	async function onSubmit() {
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
				data: "Sorry, I am not able to process your request at the moment.",
			})
			return;
		}
		response.forEach((msg) => addMessage(msg))
	}


	return (
		<div className="px-4">
			<div className="">
				<h1 className="text-2xl font-bold">{conversation.title}</h1>
				<hr />
			</div>
			<ScrollArea className="h-[79vh] *:pt-4">
				<Messages messages={messages} isPending={isPending} />
			</ScrollArea>
			<div className="flex gap-4 shadow-md pt-2">
				<Textarea
					autoFocus
					placeholder="Type your message here..."
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault()
							onSubmit()
						}
					}}
					className="w-full"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<RainbowButton
					disabled={isPending}
					className="w-fit mt-2"
					onClick={onSubmit}
				>
					<ArrowTopRightIcon className="" />
				</RainbowButton>
			</div>
		</div>
	)
}
