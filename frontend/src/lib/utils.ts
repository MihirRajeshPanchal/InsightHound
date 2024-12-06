import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MockResponse, Question } from "./types/api"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1) + "B"
	} else if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + "M"
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + "K"
	}
	return num.toString()
}

export function generateMockResponses(questions: Question[]): MockResponse[] {
	return questions.map((question) => {
		let remainingPercentage = 100
		const optionsCount = question.questionOptions.length

		const responses = question.questionOptions.map((option, index) => {
			const percentage =
				index === optionsCount - 1
					? remainingPercentage
					: Math.floor(
							Math.random() *
								(remainingPercentage / (optionsCount - index)),
						)
			remainingPercentage -= percentage

			return {
				option,
				percentage,
			}
		})

		return {
			questionText: question.questionText,
			responses,
		}
	})
}

export function convertMarkdownToHtml(markdown: string): string {
	console.log({ markdown })
	let html = markdown
		.replace(/^### (.+)$/gm, "<h3>$1</h3>")
		.replace(/^## (.+)$/gm, "<h2>$1</h2>")
		.replace(/^# (.+)$/gm, "<h1>$1</h1>")

	html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

	html = html
		.replace(/_(.*?)_/g, "<em>$1</em>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")

	html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

	html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
	html = html.replace(/~~~([\s\S]*?)~~~/g, "<pre><code>$1</code></pre>")

	html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")

	html = html.replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>")
	html = html.replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>")

	html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>')

	html = html.replace(/\\n/g, "<br>")

	return html
}
