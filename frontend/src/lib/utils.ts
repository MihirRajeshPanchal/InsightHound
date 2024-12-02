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
