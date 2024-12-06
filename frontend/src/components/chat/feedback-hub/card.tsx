import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FormUrlResponse, QuestionsData } from "@/lib/types/api"
import { Button } from "@/components/ui/button"
import { ArrowTopRightIcon } from "@radix-ui/react-icons"
import SurveyResultsCharts from "./charts"
import { generateMockResponses } from "@/lib/utils"

export default function QuestionnaireCard({
	questions,
	form_url,
}: QuestionsData & FormUrlResponse) {
	const data = questions ? generateMockResponses(questions) : []
	const [showResults, setShowResults] = React.useState(false)
	return (
		<div className="w-full flex flex-col gap-4 px-4 items-end">
			<Card className="w-full mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl">
				<CardHeader className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-t-lg">
					<CardTitle className="text-3xl font-bold text-center">
						User Interview Questionnaire
					</CardTitle>
				</CardHeader>
				<CardContent className="p-6 gap-4 grid grid-cols-1">
					{questions.map((question, index) => (
						<motion.div
							key={index}
							className="space-y-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
						>
							<h3 className="text-xl font-semibold text-indigo-800">
								{index + 1}. {question.questionText}
							</h3>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
								{question.questionOptions.map(
									(option, optionIndex) => (
										<motion.li
											key={optionIndex}
											className="bg-white p-3 rounded-lg cursor-pointer shadow-md text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
											whileHover={{ scale: 1.03 }}
											whileTap={{ scale: 0.98 }}
										>
											{option}
										</motion.li>
									),
								)}
							</ul>
						</motion.div>
					))}
				</CardContent>
			</Card>
			<div className="flex justify-between items-center w-full">
				<Button
					onClick={() => setShowResults((prev) => !prev)}
					className="px-6"
				>
					{showResults ? "Hide Results" : "See results"}
				</Button>
				<a target="_blank" className="self-end mr-4" href={form_url}>
					<Button className="px-6">
						Go to form <ArrowTopRightIcon />
					</Button>
				</a>
			</div>
			{showResults && (
				<>
					<SurveyResultsCharts surveyData={data} />
					<Button
						onClick={() => setShowResults((prev) => !prev)}
						className="px-6 w-fit"
					>
						{showResults ? "Hide Results" : "See results"}
					</Button>
				</>
			)}
		</div>
	)
}
