import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, NewspaperIcon } from "lucide-react"
import { Article } from "@/lib/types/api"

export default function NewsCard({ article }: { article: Article }) {
	return (
		<Card className="w-full grid grid-rows-[auto_1fr_auto] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg">
			<CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
				<div className="flex justify-between items-start mb-4">
					<Badge
						variant="secondary"
						className="bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
					>
						{article.source.name}
					</Badge>
					<div className="flex items-center text-sm text-blue-100">
						<CalendarIcon className="w-4 h-4 mr-1" />
						{new Date(article.publishedAt).toLocaleDateString()}
					</div>
				</div>
				<CardTitle className="text-2xl font-bold leading-tight">
					{article.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
					{article.description}
				</p>
				<div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center">
					<NewspaperIcon className="w-4 h-4 mr-1" />
					{article.content.substring(0, 100)}...
				</div>
			</CardContent>
			<CardFooter className="bg-gray-50 dark:bg-gray-800 p-6">
				<Button
					className="w-full bg-blue-500 hover:bg-blue-600 text-white"
					asChild
				>
					<a
						href={article.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						Read Full Article
					</a>
				</Button>
			</CardFooter>
		</Card>
	)
}
