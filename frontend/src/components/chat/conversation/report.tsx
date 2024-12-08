"use client"
import { Separator } from "@/components/ui/separator"
import { ActionEnum, Conversation, Message, RoleEnum } from "@/lib/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import React, { useEffect } from "react"
import { CompanyCard } from "../market-intelligence/company-card"
import { convertMarkdownToHtml } from "@/lib/utils"
import News from "../market-intelligence/news"
import ProductCards from "../product-comparison/cards"
import AudienceSegment from "../audience-segments"
import QuestionnaireCard from "../feedback-hub/card"
import Board from "../hound-board/board"
import CompetitorMapping from "../competitor-mapping"
import SendPage from "../certisend/send-page"
import LinkedinForm from "../audience-outreach/form"
import Loader from "../loader"
import MapComponent from "@/components/chat/map/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

const actionToInsightTitle: Record<ActionEnum, string> = {
	about: "on the company",
	feed: "on the news",
	product: "on the product",
	segmentation: "on the audience",
	questionnaire: "on the questionnaire",
	board: "on the board",
	rival: "on the competitors",
	mail_init: "",
	linkedin: "about linkedin",
	heatmap: "on the trends",
	mail: "",
	query: "",
	response_md: "from the response",
	response_md_pending: "",
	questionnaire_analysis: "on the feedback",
	report: "on the report",
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
					messageId={message._id || message.id}
				/>
			)
		case ActionEnum.BOARD:
			return (
				<Board
					data={message.data}
					messageId={message._id || message.id}
				/>
			)
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
			return <LinkedinForm data={message.data?.message || ""} />
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
		case ActionEnum.RESPONSE_MD_PENDING:
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
				<div className="flex flex-col gap-4 py-2 pl-0 md:pl-12">
					<RenderActionCard message={message} />
					{message.insight && (
						<Card className="overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 mx-4">
							<CardHeader className="bg-gradient-to-r from-blue-900 to-purple-900 py-2 px-4">
								<CardTitle className="text-lg font-semibold text-gray-200 flex gap-2 items-center">
									<Lightbulb size={24} />
									Insight{" "}
									{actionToInsightTitle[message.action]}
								</CardTitle>
							</CardHeader>
							<CardContent className="px-4 py-2">
								<div
									className=" text-gray-300"
									dangerouslySetInnerHTML={{
										__html: convertMarkdownToHtml(
											message.insight,
										),
									}}
								/>
							</CardContent>
						</Card>
					)}
				</div>
				<Separator className="my-4" />
			</>
		)
	)
}

function Messages({
	messages,
	isPending,
}: {
	messages: Message[]
	isPending: boolean
}) {
	return messages.map((message, idx) => (
		<div key={idx} id={`message-${idx}`}>
			<UserMessage message={message} />
			<AIMessage message={message} />
			{isPending && idx === messages.length - 1 && (
				<div className="flex justify-center gap-2 flex-col items-center [--loaderWidth:100px] [--loaderTextWidth:100px] [--loaderDuration:1.5s] p-10">
					<Loader />
				</div>
			)}
		</div>
	))
}

export default function ConversationReportPage({
	conversation,
}: {
	id: string
	conversation: Conversation
}) {
	const messages = conversation.messages || []

	const divRef = React.useRef<HTMLDivElement>(null)

	useEffect(() => {
		setTimeout(() => {
			window.print()
		}, 3000)
	}, [])

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