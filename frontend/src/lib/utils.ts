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
	let html = markdown
		.replace(
			/^### (.+)$/gm,
			"<h3 style='font-size: 1.25rem;line-height: 1.75rem;font-weight: 700;'>$1</h3>",
		)
		.replace(
			/^## (.+)$/gm,
			"<h2 style='font-size: 1.75rem;line-height: 2.25rem;font-weight: 800;'>$1</h2>",
		)
		.replace(
			/^# (.+)$/gm,
			"<h1 style='font-size: 2.25rem;line-height: 2.5rem;font-weight: 900;'>$1</h1>",
		)

	html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

	html = html
		.replace(/_(.*?)_/g, "<em>$1</em>")
		.replace(/\*(.*?)\*/g, "<em>$1</em>")

	html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

	html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
	html = html.replace(/~~~([\s\S]*?)~~~/g, "<pre><code>$1</code></pre>")

	html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")

	html = html.replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>")
	html = html.replace(
		/(<li>.*<\/li>)/g,
		"<ul style='list-style: inside;padding-top: 0.5rem'>$1</ul>",
	)

	html = html.replace(
		/\[([^\]]+)]\(([^)]+)\)/g,
		'<a style="color:blue" href="$2">$1</a>',
	)

	html = html.replace(/\\n/g, "<br>")

	return html
}

export const trim = (str: string, len = 30) => {
	if (str.length <= len) return str
	return str.slice(0, len) + "..."
}

export function getDateNDaysBack(daysBack: number): string {
	const today = new Date()

	today.setDate(today.getDate() - daysBack)

	const year = today.getFullYear()
	const month = String(today.getMonth() + 1).padStart(2, "0")
	const day = String(today.getDate()).padStart(2, "0")

	return `${year}-${month}-${day}`
}
