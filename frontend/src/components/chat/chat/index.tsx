"use client"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useChat } from "@/hooks/use-chat"
import { Send } from "lucide-react"
import { useEffect, useRef } from "react"

export default function ChatBot() {
	const { messages, setInput, input, handleSubmit, isLoading } = useChat()

	const divRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		divRef.current?.scrollTo({
			top: divRef.current?.scrollHeight,
			behavior: "smooth",
		})
	}, [isLoading])

	const suggestions = [
		"What are the current market trends?",
		"Which emerging technologies should I be aware of?",
		"Can you identify key market gaps?",
		"What are the latest consumer behavior trends?",
		"How has the market evolved in the last year?",
		"Who are the main competitors?",
		"What are my competitors doing that I should be concerned about?",
		"Can you provide a detailed analysis of a competitor's market strategy?",
		"How does my product compare to a competitor's in terms of features and pricing?",
		"What differentiates my startup from other competitors?",
		"What are the key demographics of my target audience?",
	]

	return (
		<Card className="w-11/12 max-w-6xl mx-auto mt-8">
			<CardHeader>
				<CardTitle> Strategic Chatbot</CardTitle>
			</CardHeader>
			<CardContent>
				<ScrollArea ref={divRef} className="h-[60vh] pr-4">
					{messages.current.map((message, index) => (
						<div key={index} className="mb-4">
							{message.role === "ai" ? (
								<div className="bg-muted w-4/5 p-3 rounded-lg">
									{message.content ? (
										<div
											dangerouslySetInnerHTML={{
												__html: message.content,
											}}
											className="whitespace-pre-wrap"
										/>
									) : (
										"Cooking..."
									)}
								</div>
							) : (
								<div className="bg-primary w-4/5 justify-self-end text-primary-foreground p-3 rounded-lg">
									{message.content}
								</div>
							)}
						</div>
					))}
				</ScrollArea>
			</CardContent>
			<CardFooter>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full flex-1"
				>
					<ScrollArea className="pb-2 w-full flex *:*:flex *:*:gap-2">
						<ScrollBar orientation="horizontal" />
						{suggestions.map((suggestion, index) => (
							<Button
								disabled={isLoading}
								key={index}
								type="submit"
								onClick={() => setInput(suggestion)}
								variant="outline"
							>
								{suggestion}
							</Button>
						))}
					</ScrollArea>
					<div className="flex space-x-2">
						<Input
							disabled={isLoading}
							className="flex-grow px-3 py-2 text-sm border rounded-md"
							value={input}
							autoFocus
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type your message..."
						/>
						<Button type="submit">
							<Send className="rotate-45 mr-2" />
						</Button>
					</div>
				</form>
			</CardFooter>
		</Card>
	)
}
